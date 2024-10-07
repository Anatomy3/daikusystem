import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Cari user berdasarkan username
    const user = await prisma.employee.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Bandingkan hash password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // Kembalikan userId dan role saat login berhasil
      return res.status(200).json({ userId: user.id, role: user.department, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
