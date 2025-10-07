import { NextResponse } from "next/server";

export function middleware(req) {
	// const url = req.nextUrl.clone();
	// const path = url.pathname;

	// const loggedIn = req.cookies.get("loggedIn")?.value;
	// const emailEntered = req.cookies.get("emailEntered")?.value;
	// const codeVerified = req.cookies.get("codeVerified")?.value;

	// // ✅ Protect dashboards
	// if (
	// 	(path.startsWith("/ownerdashboard") ||
	// 		path.startsWith("/workerdashboard")) &&
	// 	loggedIn !== "true"
	// ) {
	// 	url.pathname = "/login";
	// 	return NextResponse.redirect(url);
	// }

	// // ✅ Protect resetpassword/inputcode
	// if (path === "/resetpassword/inputcode" && emailEntered !== "true") {
	// 	url.pathname = "/resetpassword";
	// 	return NextResponse.redirect(url);
	// }

	// // ✅ Protect resetpassword/changepassword
	// if (path === "/resetpassword/changepassword" && codeVerified !== "true") {
	// 	url.pathname = "/resetpassword/inputcode";
	// 	return NextResponse.redirect(url);
	// }

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/ownerdashboard/:path*",
		"/workerdashboard/:path*",
		"/resetpassword/:path*",
	],
};
