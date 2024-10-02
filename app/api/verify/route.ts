// app/api/verify/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('aimlsa');

    const member = await db.collection('members').findOne({ id });

    if (!member) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: member.name,
      prn: member.prn,
      class: member.class,
      year: member.year,
      div: member.div,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
