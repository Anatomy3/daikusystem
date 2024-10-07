import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { namaLengkap, tanggalLaporan, dariJam, hinggaJam, progressHarian, statusHarian } = req.body;

    try {
      // Ambil waktu saat ini untuk jam pengiriman
      const waktuPengiriman = new Date();

      // Format waktu ke jam dan menit (tanpa detik, 24 jam)
      const formattedTime = waktuPengiriman.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      // Simpan data laporan ke database dengan waktu pengiriman
      const laporan = await prisma.laporanHarian.create({
        data: {
          namaLengkap,
          tanggalLaporan: new Date(tanggalLaporan), // Tanggal dari form
          dariJam,
          hinggaJam,
          progressHarian,
          statusHarian,
          waktuPengiriman, // Simpan waktu saat laporan diunggah
        },
      });

      // Jika berhasil, kirim respons sukses
      res.status(200).json({
        message: 'Laporan berhasil disimpan',
        laporan,
        waktuTerkirim: formattedTime,  // Kirim waktu yang sudah diformat ke frontend
      });
    } catch (error) {
      console.error('Error submitting laporan:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan laporan.' });
    }
  } else if (req.method === 'GET') {
    try {
      const laporanHarian = await prisma.laporanHarian.findMany({
        orderBy: {
          tanggalLaporan: 'desc',
        },
      });
      res.status(200).json(laporanHarian);
    } catch (error) {
      console.error('Error fetching laporan harian:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil laporan.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
