'use client';
import SalespageTemplate from '@/components/salespage/SalespageTemplate';

const content = {
  heroHeadline: 'Dah Rawat Berkali-Kali Tapi Gangguan Masih Datang Balik? Ini Sebabnya — Dan Ini Penyelesaiannya',
  heroSubPoints: [
    'Sudah pergi ke beberapa tempat rawatan tapi simptom masih berulang.',
    'Rasa sembuh sebentar kemudian gangguan datang balik lebih kuat.',
    'Penat dan hilang harapan kerana sudah banyak duit dan masa dihabiskan.',
  ],
  heroDescription: 'Gangguan berulang sering berlaku apabila punca sebenar tidak dirawat dengan tuntas. ESyifaa menggunakan pendekatan menyeluruh patuh syariah untuk mengenal pasti dan menangani punca — bukan sekadar simptom — supaya gangguan tidak datang lagi.',

  problemHeadline: 'Kenapa Gangguan Anda Sentiasa Berulang?',
  problemSubtext: 'Tanda-tanda gangguan yang tidak dirawat dengan tuntas sering menunjukkan corak yang sama.',
  problems: [
    { title: 'Sembuh selepas rawatan tapi dalam seminggu dua gangguan datang balik.', img: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Setiap kali rawatan, simptom berbeza-beza dan makin kompleks.', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { title: 'Dah habiskan banyak wang tapi belum jumpa penyelesaian sebenar.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rasa putus asa dan mula mempersoalkan keberkesanan rawatan Islam.', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80' },
    { title: 'Gangguan semakin teruk semasa waktu tertentu seperti malam atau selepas solat.', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
    { title: 'Ahli keluarga lain juga mula terjejas selepas anda mengalami gangguan.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  ],

  matlamatHeadline: 'Matlamat ESyifaa Dalam Menangani Gangguan Berulang',
  goals: [
    'Mengenal pasti punca sebenar gangguan berulang melalui diagnos teliti.',
    'Merawat punca — bukan sekadar simptom — supaya gangguan tidak datang balik.',
    'Memantau perkembangan pesakit selama 7 hari selepas rawatan.',
    'Memberikan rawatan susulan percuma jika gangguan masih ada.',
    'Membekali pesakit dengan amalan pelindung diri yang kukuh dan berterusan.',
  ],

  ctaHeadline: 'Hentikan Kitaran Gangguan Berulang — Dapatkan Rawatan Yang Menyeluruh',
  ctaSubtext: 'Diagnos percuma dahulu. Perawat akan kenal pasti sama ada ada punca yang belum ditangani sepenuhnya dalam rawatan terdahulu.',

  faqs: [
    { q: 'Kenapa gangguan saya sentiasa datang balik walaupun sudah dirawat?', a: 'Biasanya berlaku kerana punca sebenar tidak dikenal pasti atau tidak dirawat dengan tuntas. ESyifaa fokus kepada menangani punca, bukan hanya simptom.' },
    { q: 'Adakah rawatan ESyifaa berbeza dari rawatan lain?', a: 'ESyifaa menggunakan pendekatan menyeluruh dengan pemantauan aktif dan rawatan susulan percuma untuk memastikan pemulihan yang tuntas.' },
    { q: 'Berapa lama saya perlu bersabar sebelum sembuh?', a: 'Tempoh berbeza mengikut individu. Yang penting adalah konsisten dengan ikhtiar dan amalan yang diberikan. Kami akan pandu anda sepanjang proses.' },
    { q: 'Adakah gangguan berulang bermakna rawatan tidak berkesan?', a: 'Tidak semestinya. Gangguan boleh berulang jika amalan pelindung tidak dijaga atau ada sumber gangguan yang belum ditemui. Kami bantu selesaikan ini.' },
    { q: 'Apa yang berbeza dengan pakej rawatan ESyifaa?', a: 'Pemantauan 7 hari dan rawatan susulan percuma memastikan kami tidak berhenti sehingga anda benar-benar pulih, dengan izin Allah.' },
  ],

  closingHeadline: 'Kali Ini, Biar Ia Diselesaikan Dengan Tuntas',
  closingParagraphs: [
    'Anda sudah banyak cuba. Anda sudah banyak berkorban. Kali ini, biar ESyifaa bantu anda selesaikan dari akar umbi.',
    'Dengan diagnos yang teliti dan rawatan yang menyeluruh, insya-Allah gangguan ini boleh dihentikan buat selamanya.',
    'Mulakan dengan diagnos percuma hari ini. Tiada obligasi. Tiada bayaran awal.',
  ],
};

export default function GangguanBerulangPage() {
  return <SalespageTemplate {...content} />;
}
