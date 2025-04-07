"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="center-flex h-screen bg-black text-white flex-col gap-5">
            <span className="text-3xl"><span className="text-red-600">Error : </span>Page not Found</span>
            <div className="flex gap-3.5 text-xl">
                <button onClick={() => router.back()} className="btn-primary bg-main">Go Back</button>
                <Link href={"/"}><button className="btn-primary bg-main">Go Home</button></Link>
            </div>
        </div>
    );
}
