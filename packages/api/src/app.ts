import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import { User } from "@prisma/client";
import prisma from "@heimdall/db";
import session from "express-session";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import RedisStore from "connect-redis";
// get env vars
const env_path = path.join(__dirname, "../../../.env");
require("dotenv").config({ path: env_path });

const PORT = process.env.API_PORT ?? 3001;
const SESSION_SECRET = process.env.SESSION_SECRET ?? "";
const REDIS_URL = process.env.REDIS_URL ?? "";

const redisClient = createClient({
  url: REDIS_URL,
});
const app = express();

async function main() {
  redisClient.connect();
  const redisStore = new (RedisStore as any)({
    client: redisClient,
    prefix: "api-session:",
  });
  app.use(cors());
  app.use(morgan("combined"));
  app.use(cookieParser(SESSION_SECRET));
  app.use(express.json());
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      proxy: process.env.NODE_ENV === "production",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "lax",
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? "",
        callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        if (!profile.emails || profile.emails.length === 0) {
          done(new Error("Invalide emails"));
          return;
        }
        try {
          const email = profile.emails[0]!.value;
          const user = await prisma.user.upsert({
            create: {
              name: profile.displayName,
              email: email,
              lastLogin: new Date(),
            },
            update: {
              lastLogin: new Date(),
            },
            where: {
              email: email,
            },
          });
          done(null, user);
        } catch (e: any) {
          done(new Error(e));
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, (user as User).id);
  });

  passport.deserializeUser(function (obj, cb) {
    prisma.user
      .findUnique({
        where: {
          id: obj as string,
        },
      })
      .then((user) => {
        cb(null, user);
      })
      .catch((e) => {
        console.error(e);
        cb(null, undefined);
      });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/404" }),
    function (req, res) {
      // Successful authentication, redirect success.
      res.redirect(`${process.env.FRONTEND_URL}/`);
    }
  );

  app.get("/auth/logout", function (req, res) {
    req.logout(() => {
      res.redirect(`${process.env.FRONTEND_URL}/`);
    });
  });

  app.get("/user", function (req, res) {
    if (!req.user) {
      res.status(404).send();
    }
    res.status(200).send(req.user);
  });

  app.get("/ping", function (req, res) {
    res.send("pong");
  });

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

  app.use((error: any, req: any, res: any, next: any) => {
    console.error(error);
    res.status(500).send("Something broke!");
  });
}

main().catch((e) => {
  console.error(e);
  console.error("SHUTTING DOWN");
});
