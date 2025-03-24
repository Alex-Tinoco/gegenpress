import {
  createAccount,
  deleteAccount,
  editUserData,
  findUserByEmail,
  findUserById,
  retrievePassword,
} from "@/lib/account";
import {
  deleteAuthCookies,
  signAccessToken,
  signRefreshToken,
} from "@/lib/jwtfunctions";
import { Account, Payload } from "@models/authmodel";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case "checkAccount":
        return await handleCheckAccount(data);

      case "createAccount":
        return await handleCreateAccount(data);

      case "logOut":
        return await handleLogOut();

      case "editAccount":
        let { id, ...userData } = data;
        return await HandleEditingAccount(id, userData);

      case "deleteAccount":
        return await handleDeleteAccount(data.id);

      default:
        return new NextResponse(null, { status: 405 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function handleCheckAccount(data: any) {
  try {
    const user = await findUserByEmail(data.email);
    console.log(user);
    console.log("Executing checkAccount");

    if (user) {
      try {
        const password = await retrievePassword(user.id);
        if (await bcrypt.compare(data.password, password.password.hash)) {
          let payload: Payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            memory: data.memory,
          };

          const response = NextResponse.json({}, { status: 200 });

          // Set cookies on the NextResponse object
          const accessToken = await signAccessToken(payload);
          const refreshToken = data.memory
            ? await signRefreshToken(payload)
            : undefined;
          response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60, // 1 hour
            path: "/",
          });

          if (refreshToken) {
            response.cookies.set("refreshToken", refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 15 * 24 * 60 * 60,
              path: "/",
            });
          }

          return response;
        } else {
          return NextResponse.json(
            { error: "Unauthorized: Invalid password" },
            { status: 401 },
          );
        }
      } catch (error) {
        console.error("Error retrieving password:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        { message: "No user found. Please create an account." },
        { status: 202 },
      );
    }
  } catch (error) {
    console.error("Error checking account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function handleCreateAccount(data: any) {
  try {
    console.log("Executing createAccount");

    const user = await findUserByEmail(data.email);
    if (!user) {
      try {
        await createAccount(data);
        return NextResponse.json(
          { message: "Account Created" },
          { status: 200 },
        );
      } catch (error) {
        console.error("Error creating account:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Conflict: User already exists" },
        { status: 409 },
      );
    }
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function handleLogOut() {
  try {
    const response = NextResponse.json({}, { status: 200 });

    response.cookies.set("accessToken", "", {
      maxAge: 0,
      path: "/",
    });
    response.cookies.set("refreshToken", "", {
      maxAge: 0,
      path: "/",
    });

    console.log("Logged out");
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function HandleEditingAccount(id: string, data: Account) {
  try {
    console.log("Executing editAccount");

    const user = await findUserById(id);
    if (!user) {
      return NextResponse.json(
        { error: "Conflict: User does not exist" },
        { status: 409 },
      );
    } else {
      try {
        await editUserData(id, data);
        return NextResponse.json(
          { message: "Account updated" },
          { status: 200 },
        );
      } catch (error) {
        console.error("Error updating account:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    console.error("Error editing account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function handleDeleteAccount(id: string) {
  try {
    console.log("Executing deleteAccount");

    const user = await findUserById(id);
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "Conflict: User does not exist" },
        { status: 409 },
      );
    } else {
      try {
        await deleteAccount(id);
        let res = NextResponse.json(
          { message: "Account deleted" },
          { status: 200 },
        );
        await deleteAuthCookies(res);
        return res;
      } catch (error) {
        console.error("Prisma Error deleting account:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
