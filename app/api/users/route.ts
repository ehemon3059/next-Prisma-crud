import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";




//Get /api/users - Fetch all users

export async function GET(){
    try{
        const users = await prisma.user.findMany({
            orderBy: {createdAt: 'desc'}

        })
        return NextResponse.json(users);
    }catch (error) {
       console.error("Error fetching users:", error);
       return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );

    }
}



// Post /api/users - Create a new User

export async function POST(request: Request){
    try{
        const { name, email} = await  request.json();

        if(!name || !email){
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            )
        }

        const user = await prisma.user.create({
            data: {
                name, email
            }
        });

        return NextResponse.json(user, { status: 201 });

    }catch (error : any ){
        console.error("Error creating user:", error);
        
        if (error.code ==='P2002'){
            return NextResponse.json(
                {error: "Email Already Exists"},
                { status: 400}
            )
        }


        return NextResponse.json(
            { erroe: "Failed to create user" },
            { status: 500 }  
        )
    } 
}

