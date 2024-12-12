import User from "../../models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, UserRole } from "../interfaces";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = "";
  if (req.headers.authorization) {
    try {
      //You keep changing this I don't know why. Bearer token is a best practice.
      token = req.headers.authorization.split(' ')[1];
      console.log("auth token in middleware", token);
      const decoded = jwt.verify(
        token,
        process.env["JWT_SECRET"] as string
      ) as any;
      console.log("decoded id", decoded);
      const userFound = await User.findById(decoded?.id).select("-hash");
      req.user = userFound ? userFound : undefined;
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error: any) {
      console.error(error["message"]);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (user?.role !== UserRole.ADMIN) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Admin access required" });
  }
  next();
};

export const hasAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = undefined;
    return next();
  }

  try {
    const token = authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.id).select("-hash");

    req.user = user || undefined;
  } catch (error) {
    req.user = undefined;
  }

  next();
};

// // Ensure user is an admin
// export const admin = async (req:RequestWithUser, res:Response,next:NextFunction) => {
//   const user = await User.findOne({
//     _id: req.user.id,
//   })

//   if (user.role === "Admin") {
//     next()
//   } else {
//     res.status(401).json({
//       msg: "Unauthorized",
//     })
//   }
// }

// export const canPerformAction = async (req:RequestWithUser, res:Response,next:NextFunction) => {
//   try {
//     const user = await User.findOne({
//       _id: req.user.id,
//     })

//     const userToUpdate = await User.findOne({
//       _id: req.body["_id"],
//     })

//     if (!user || !userToUpdate) {
//       res.status(401).json({ msg: "User does not exist" })
//     } else {
//       if (APP_ROLES[user?.role] < APP_ROLES[userToUpdate?.role]) {
//         res.status(401).json({ msg: "Unauthorized" })
//       } else {
//         next()
//       }
//     }
//   } catch (err) {
//     console.log("err at verifying id", err)
//     res.status(500).send("Server Error")
//   }
// }
