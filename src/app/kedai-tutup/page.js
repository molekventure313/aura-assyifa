'use client';
import SalespageTemplate from '@/components/salespage/SalespageTemplate';

const content = {
  heroHeadline: 'Kedai Anda Nampak Tutup Di Mata Pelanggan? Perniagaan Tidak Maju Walaupun Sudah Berusaha Keras?',
  heroSubPoints: [
    'Pelanggan jarang masuk walaupun lokasi kedai strategik dan produk bagus.',
    'Jualan merudum tiba-tiba tanpa sebarang sebab logik yang boleh dikenal pasti.',
    'Pesaing lain maju tapi perniagaan anda seolah-olah "tidak nampak" oleh orang ramai.',
  ],
  heroDescription: 'Ada perniagaan yang tidak maju bukan kerana kurang usaha atau strategi — tetapi kerana ada halangan ghaib yang menutup pintu rezeki. ESyifaa membantu peniaga mendapatkan ikhtiar rawatan patuh syariah untuk membuang halangan tersebut dan membuka semula aliran rezeki.',

  problemHeadline: 'Adakah Perniagaan Anda Mengalami Tanda-Tanda Ini?',
  problemSubtext: 'Perniagaan yang terjejas gangguan ghaib sering menunjukkan corak yang sukar dijelaskan secara logik.',
  problems: [
    { title: 'Kedai sering sunyi walaupun lokasi dan produk tiada masalah.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
    { title: 'Pelanggan masuk tapi tidak jadi beli — berlaku berulang kali.', img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80' },
    { title: 'Wang masuk tapi cepat habis, susah nak simpan atau berkembang.', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { title: 'Pekerja sering keluar masuk atau ada konflik dalaman yang berterusan.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { title: 'Ada perasaan kuat bahawa pesaing atau orang lain "buat sesuatu" kepada perniagaan anda.', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sudah cuba pelbagai strategi pemasaran tapi hasilnya masih tidak memuaskan.', img: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=600&q=80' },
  ],

  matlamatHeadline: 'Matlamat ESyifaa Dalam Membantu Peniaga Yang Terjejas Gangguan Ghaib',
  goals: [
    'Mengenal pasti sama ada ada gangguan atau sihir yang mempengaruhi perniagaan anda.',
    'Merawat dan membuang halangan ghaib yang menyekat aliran rezeki.',
    'Membersihkan premis perniagaan dari pengaruh negatif secara patuh syariah.',
    'Membantu memulihkan keyakinan dan semangat dalam meneruskan perniagaan.',
    'Memberikan panduan amalan dan wirid untuk perlindungan perniagaan jangka panjang.',
  ],

  ctaHeadline: 'Buka Semula Pintu Rezeki Perniagaan Anda — Mulakan Dengan Diagnos Percuma',
  ctaSubtext: 'Perawat akan kenal pasti sama ada ada halangan ghaib dalam perniagaan anda. Tiada bayaran awal. Tiada obligasi.',

  faqs: [
    { q: 'Bolehkah gangguan ghaib benar-benar menjejaskan perniagaan?', a: 'Ya. Dalam Islam, sihir penghalang rezeki dan sihir perniagaan adalah nyata. Ini boleh menyebabkan aliran pelanggan terhenti, wang sukar terkumpul dan perniagaan tidak berkembang.' },
    { q: 'Bagaimana cara rawatan dibuat untuk perniagaan?', a: 'Perawat akan diagnos terlebih dahulu, kemudian lakukan rawatan yang merangkumi premis, pemilik dan perniagaan secara keseluruhan menggunakan kaedah patuh syariah.' },
    { q: 'Berapa lama sebelum saya nampak perubahan dalam perniagaan?', a: 'Sesetengah peniaga melihat perubahan dalam minggu pertama. Namun ia bergantung kepada tahap gangguan dan konsistensi amalan pelindung yang diberikan.' },
    { q: 'Adakah saya perlu tutup kedai semasa rawatan?', a: 'Tidak perlu. Rawatan dilakukan dari jarak jauh dan tidak mengganggu operasi harian perniagaan anda.' },
    { q: 'Adakah rawatan ini sesuai untuk semua jenis perniagaan?', a: 'Ya. Sama ada kedai fizikal, perniagaan online atau syarikat — selagi ada unsur halangan ghaib, ikhtiar rawatan boleh dilakukan.' },
  ],

  closingHeadline: 'Perniagaan Anda Layak Untuk Maju — Jangan Biarkan Halangan Ghaib Menahannya',
  closingParagraphs: [
    'Anda sudah berusaha keras. Anda sudah berkorban masa dan wang. Tapi jika ada halangan yang bukan di tangan manusia — ia perlu diselesaikan dengan cara yang betul.',
    'ESyifaa ada untuk membantu peniaga seperti anda mendapatkan semula momentum perniagaan dengan ikhtiar yang bersih dan patuh syariah.',
    'Mulakan dengan diagnos percuma hari ini. Biar kami tunjukkan jalan yang ada.',
  ],
};

export default function KedaiTutupPage() {
  return <SalespageTemplate {...content} />;
}
