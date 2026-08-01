'use client';
import SalespageTemplate from '@/components/salespage/SalespageTemplate';

const content = {
  heroHeadline: 'Adakah Anda Disihir? Kenali Tanda-Tandanya Dan Dapatkan Ikhtiar Rawatan Sekarang',
  heroSubPoints: [
    'Hubungan rumah tangga tiba-tiba rosak tanpa sebab yang jelas.',
    'Rezeki terhenti walaupun sudah berusaha keras.',
    'Badan sakit kronik yang doktor tidak jumpa puncanya.',
  ],
  heroDescription: 'Sihir adalah nyata dan diakui dalam Islam. ESyifaa membantu anda mendapatkan ikhtiar rawatan patuh syariah untuk memutuskan pengaruh sihir dan kembali menjalani kehidupan normal bersama keluarga.',

  problemHeadline: 'Adakah Anda Mengalami Simptom Terkena Sihir?',
  problemSubtext: 'Sihir boleh memberi kesan kepada pelbagai aspek kehidupan. Kenali simptomnya sebelum terlambat.',
  problems: [
    { title: 'Rumah tangga bergaduh tanpa sebab, hampir bercerai.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rezeki terhenti, perniagaan tidak maju walaupun berusaha.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sakit badan kronik yang doktor tidak jumpa punca.', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { title: 'Mimpi bertemu makhluk pelik, terasa ditekan semasa tidur.', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
    { title: 'Tiba-tiba benci atau antipati terhadap pasangan tanpa sebab.', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sudah rawat berkali-kali tapi sihir masih terasa aktif.', img: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=600&q=80' },
  ],

  matlamatHeadline: 'Apa Yang Kami Bantu Capai Melalui Rawatan Sihir ESyifaa?',
  goals: [
    'Memutuskan pengaruh sihir dengan bacaan Al-Quran dan doa ma\'thur.',
    'Membantu memulihkan hubungan rumah tangga yang terjejas.',
    'Membuka semula rezeki yang terhalang akibat sihir.',
    'Melindungi diri dan keluarga daripada serangan sihir berulang.',
    'Memberikan panduan dan ikhtiar pencegahan jangka panjang.',
  ],

  ctaHeadline: 'Jangan Biarkan Sihir Terus Menghancurkan Kehidupan Anda',
  ctaSubtext: 'Dapatkan diagnos percuma dahulu. Perawat ESyifaa akan kenal pasti sama ada anda benar-benar terkena sihir — kemudian anda buat keputusan.',

  faqs: [
    { q: 'Bagaimana saya tahu jika saya benar-benar terkena sihir?', a: 'Perawat akan melakukan diagnos (scan) percuma berdasarkan simptom yang anda kongsikan. Ini akan membantu mengesahkan sama ada ada pengaruh sihir atau tidak.' },
    { q: 'Adakah rawatan sihir ini patuh syariah?', a: 'Ya. Rawatan menggunakan bacaan Al-Quran, Asmaul Husna dan doa-doa ma\'thur yang bersih dan selaras dengan syariat Islam.' },
    { q: 'Bolehkah rawatan dilakukan dari jauh?', a: 'Ya. Rawatan boleh dilakukan sepenuhnya dari jarak jauh. Anda tidak perlu hadir secara fizikal.' },
    { q: 'Berapa lama masa yang diperlukan untuk rawatan sihir?', a: 'Tempoh bergantung kepada tahap dan jenis sihir. Perawat akan terangkan selepas diagnos awal.' },
    { q: 'Adakah ada jaminan sihir akan hilang?', a: 'Rawatan adalah ikhtiar. Kami berusaha sepenuhnya dengan izin Allah. Kesembuhan adalah kuasa Allah SWT semata-mata.' },
  ],

  closingHeadline: 'Anda Tidak Perlu Terus Hidup Dalam Belenggu Sihir',
  closingParagraphs: [
    'Sihir bukan hanya cerita dongeng. Ia adalah hakikat yang diakui dalam Al-Quran dan hadis Nabi SAW.',
    'Dengan ikhtiar yang betul, patuh syariah dan bertawakkal kepada Allah — ada jalan keluar dari setiap ujian.',
    'Tempah diagnos percuma hari ini. Langkah pertama itu yang paling penting.',
  ],
};

export default function SihirPage() {
  return <SalespageTemplate {...content} />;
}
