// Update and Delete User API Route

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//`app/api/users/[id]/route.ts`

export async function PUT(
    request: Request,
    { params }: { params: { id: string}}
){
    try {
        const id = parseInt(params.id)
        const { name, email } = await request.json();

        if(!name || !email){
            return NextResponse.json(
                { error: 'Name and Email are required'},
                { status: 400}
            )
        }
        const user = await prisma.user.update({
            where: {id},
            data: {name, email}
        })

        return NextResponse.json(user);
    } catch (error: any){
        console.error("Error update user:", error)

        if (error.code === 'P2025'){
            return NextResponse.json(
                { error: "Email already exists"},
                { status: 400}
            )
        }

        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        )
    }
}


//DELETE / api /users/[id] -  Delete a user

export async function DELETE(

    request: Request,
    { params }: { params: {id: string}},
){
    try{
        const id = parseInt(params.id);

        await prisma.user.delete({
            where: {id}
        })

        return NextResponse.json({ message: "User deleted successfully" });

    }catch (error: any){

        console.error(" Error deleting user:", error)

        if(error.code === 'P2025'){
            return NextResponse.json(
                { error: "user not found"},
                { status: 404}
            )
        }
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 }
        )

    }
}
