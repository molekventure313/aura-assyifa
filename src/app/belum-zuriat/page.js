'use client';
import SalespageTemplate from '@/components/salespage/SalespageTemplate';

const content = {
  heroHeadline: 'Sudah Bertahun Bernikah Tapi Masih Belum Dikurniakan Zuriat? Mungkin Ada Halangan Yang Tidak Nampak',
  heroSubPoints: [
    'Doktor kata tiada masalah perubatan, tapi tetap tidak mengandung.',
    'Sudah cuba pelbagai cara termasuk rawatan perubatan dan herba tapi masih belum berjaya.',
    'Hubungan rumah tangga tegang akibat tekanan menanti zuriat.',
  ],
  heroDescription: 'Ada pasangan yang belum dikurniakan zuriat bukan kerana masalah perubatan, tetapi kerana ada penghalang ghaib yang menghalang. ESyifaa membantu anda mendapatkan ikhtiar rawatan patuh syariah untuk membuka halangan tersebut — dengan tawakkal penuh kepada Allah Yang Maha Memberi.',

  problemHeadline: 'Adakah Ini Yang Anda Sedang Lalui?',
  problemSubtext: 'Pasangan yang belum dikurniakan zuriat sering mengalami pelbagai tekanan yang tidak nampak.',
  problems: [
    { title: 'Doktor kata tiada masalah, tapi tetap tidak mengandung bertahun-tahun.', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { title: 'Pernah mengandung tapi keguguran berulang tanpa sebab perubatan yang jelas.', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rasa ada sesuatu yang menghalang — firasat, mimpi atau tanda-tanda pelik.', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80' },
    { title: 'Tekanan dari keluarga menjejaskan keharmonian rumah tangga.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sudah berubat dengan pelbagai cara tapi usaha tidak berhasil.', img: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rasa rendah diri, sedih mendalam dan hilang harapan sedikit demi sedikit.', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
  ],

  matlamatHeadline: 'Apa Yang ESyifaa Bantu Capai Untuk Pasangan Yang Mendambakan Zuriat',
  goals: [
    'Mengenal pasti sama ada ada penghalang ghaib yang menjejaskan kesuburan.',
    'Menjalankan ikhtiar rawatan untuk membuang halangan tersebut dengan izin Allah.',
    'Membantu memulihkan keharmonian dan ketenangan hubungan suami isteri.',
    'Memberikan panduan doa dan amalan yang membantu membuka pintu rezeki zuriat.',
    'Menyokong anda secara rohani dalam menjalani ujian ini dengan sabar dan tawakkal.',
  ],

  ctaHeadline: 'Jangan Putus Asa — Masih Ada Ikhtiar Yang Belum Dicuba',
  ctaSubtext: 'Mulakan dengan diagnos percuma. Perawat akan lihat sama ada ada faktor ghaib yang menghalang. Tiada obligasi. Tiada bayaran awal.',

  faqs: [
    { q: 'Adakah benar gangguan ghaib boleh menghalang zuriat?', a: 'Ya. Ada kes-kes di mana penghalang ghaib seperti sihir atau gangguan mistik mengganggu proses kesuburan. Ini diakui dalam Islam dan dapat ditangani melalui ikhtiar rawatan yang betul.' },
    { q: 'Adakah rawatan ini menggantikan rawatan perubatan?', a: 'Tidak. Rawatan ESyifaa adalah ikhtiar rohani yang melengkapi rawatan perubatan. Kami galakkan anda teruskan rawatan perubatan seiring dengan ikhtiar ini.' },
    { q: 'Berapa lama biasanya proses sebelum ada perubahan?', a: 'Setiap kes adalah berbeza. Sesetengah pasangan melihat perubahan selepas beberapa sesi. Yang penting adalah konsisten dengan ikhtiar dan doa.' },
    { q: 'Adakah kedua-dua suami dan isteri perlu dirawat?', a: 'Perawat akan menilai semasa diagnos. Ada kes hanya satu pihak yang perlu dirawat, ada yang memerlukan rawatan kedua-dua pihak.' },
    { q: 'Apakah jaminan yang boleh ESyifaa berikan?', a: 'Tiada manusia yang boleh menjamin zuriat — itu kuasa Allah semata-mata. Kami hanya boleh menjanjikan ikhtiar yang ikhlas, menyeluruh dan patuh syariah.' },
  ],

  closingHeadline: 'Setiap Pasangan Yang Sabar Dalam Ujian Ini Layak Mendapat Ikhtiar Terbaik',
  closingParagraphs: [
    'Menanti zuriat adalah antara ujian yang paling berat. Tapi ingat — Allah tidak pernah menutup semua pintu pada masa yang sama.',
    'ESyifaa ada bersama anda untuk membantu membuka setiap pintu ikhtiar yang ada, dengan penuh harapan kepada Rahman dan Rahim Allah.',
    'Mulakan perjalanan ini dengan diagnos percuma hari ini. Langkah pertama yang paling berani.',
  ],
};

export default function BelumZuriatPage() {
  return <SalespageTemplate {...content} />;
}
