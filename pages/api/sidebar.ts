import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getUserProfile(req, res);
    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}

// Ambil data employee berdasarkan userId (GET)
async function getUserProfile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Ambil data employee berdasarkan ID dari database
    const employee = await prisma.employee.findUnique({
      where: { id: Number(userId) },
      select: {
        fullName: true,
        department: true, // Ambil department dari database
        photo: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Kirimkan data profil pengguna
    return res.status(200).json({
      fullName: employee.fullName || 'User Name',
      department: employee.department || 'Magang', // Default ke "Magang" jika kosong
      photo: employee.photo || '/daiku/profile.png',
    });
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
