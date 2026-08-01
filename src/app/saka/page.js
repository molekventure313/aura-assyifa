'use client';
import SalespageTemplate from '@/components/salespage/SalespageTemplate';

const content = {
  heroHeadline: 'Saka Warisan Keluarga Masih Menghantui Anda? Ini Masanya Untuk Putuskan Ikatan Itu',
  heroSubPoints: [
    'Ahli keluarga sering sakit atau mengalami nasib malang berturutan.',
    'Ada rasa "diikut" atau diganggu makhluk yang turun dari nenek moyang.',
    'Kehidupan tidak maju walaupun sudah berusaha — seolah ada halangan tidak nampak.',
  ],
  heroDescription: 'Saka adalah gangguan mistik warisan yang diturunkan dari generasi ke generasi. ESyifaa membantu anda memutuskan ikatan saka dengan kaedah rawatan patuh syariah supaya anda dan zuriat anda bebas dari belenggu ini.',

  problemHeadline: 'Adakah Saka Warisan Menjejaskan Kehidupan Anda?',
  problemSubtext: 'Saka sering tidak disedari kerana ia diwarisi secara senyap dari generasi terdahulu.',
  problems: [
    { title: 'Bapa, datuk atau nenek pernah terlibat dengan perkara syirik atau bomoh.', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80' },
    { title: 'Makhluk yang sama mengganggu beberapa ahli keluarga berbeza.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sering bermimpi bertemu "orang tua" atau nenek moyang yang sudah meninggal.', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
    { title: 'Anak-anak atau cucu juga mula menunjukkan tanda-tanda yang sama.', img: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rezeki keluarga sentiasa sempit walaupun bekerja keras.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sudah pernah dirawat tapi saka datang balik semula.', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
  ],

  matlamatHeadline: 'Apa Yang Kami Bantu Capai Melalui Rawatan Saka ESyifaa?',
  goals: [
    'Memutuskan ikatan saka warisan dari nenek moyang secara patuh syariah.',
    'Melindungi zuriat anda supaya saka tidak diturunkan kepada generasi seterusnya.',
    'Memulihkan kesejahteraan rohani dan emosi seluruh keluarga.',
    'Membuka semula pintu rezeki yang terhalang akibat pengaruh saka.',
    'Memberi panduan amalan pelindung diri yang berterusan.',
  ],

  ctaHeadline: 'Jangan Biarkan Saka Terus Diwarisi Kepada Anak Cucu Anda',
  ctaSubtext: 'Dapatkan diagnos percuma dahulu. Perawat ESyifaa akan kenal pasti sama ada ada pengaruh saka dalam keluarga anda — kemudian anda buat keputusan.',

  faqs: [
    { q: 'Bagaimana saya tahu jika saya mewarisi saka?', a: 'Perawat akan lakukan diagnos percuma berdasarkan sejarah keluarga dan simptom yang dikongsi. Ini membantu mengenal pasti sama ada ada pengaruh saka atau tidak.' },
    { q: 'Adakah saka boleh diputuskan sepenuhnya?', a: 'Dengan izin Allah dan ikhtiar yang betul, saka boleh dilepaskan. Namun ia memerlukan rawatan yang teliti dan tawakkal penuh kepada Allah.' },
    { q: 'Adakah semua ahli keluarga perlu dirawat?', a: 'Tidak semestinya. Perawat akan menilai situasi dan menasihati siapa yang perlu mendapatkan rawatan berdasarkan keadaan masing-masing.' },
    { q: 'Bolehkah saka kembali selepas rawatan?', a: 'Dengan amalan pelindung yang betul dan konsisten, risiko saka kembali dapat dikurangkan. Kami akan beri panduan lengkap selepas rawatan.' },
    { q: 'Adakah rawatan ini patuh syariah?', a: 'Ya sepenuhnya. Rawatan menggunakan bacaan Al-Quran, Asmaul Husna dan doa-doa ma\'thur yang bersih dari sebarang unsur syirik.' },
  ],

  closingHeadline: 'Anda Boleh Putuskan Rantaian Saka Ini — Bermula Hari Ini',
  closingParagraphs: [
    'Saka bukan takdir yang perlu diterima begitu sahaja. Dengan izin Allah dan ikhtiar yang betul, setiap belenggu boleh diputuskan.',
    'Pasukan ESyifaa bersedia membantu anda dan keluarga mendapatkan semula kebebasan rohani yang sepatutnya.',
    'Ambil langkah pertama sekarang. Diagnos percuma. Tiada obligasi.',
  ],
};

export default function SakaPage() {
  return <SalespageTemplate {...content} />;
}
