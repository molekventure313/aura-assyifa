'use client';
import SalespageTemplate from '@/components/salespage/SalespageTemplate';

const content = {
  heroHeadline: 'Diganggu Sesuatu Yang Tidak Nampak? Anda Tidak Berseorangan — Dan Ada Jalan Keluarnya',
  heroSubPoints: [
    'Terasa ada kehadiran asing di rumah atau menyertai anda ke mana sahaja.',
    'Badan sakit secara tiba-tiba, lemah dan cepat penat tanpa sebab.',
    'Emosi tidak stabil, cepat marah, menangis atau rasa putus asa.',
  ],
  heroDescription: 'Gangguan mistik adalah ujian yang nyata. ESyifaa menyediakan ikhtiar rawatan patuh syariah yang membantu anda memahami apa yang berlaku dan mengambil langkah yang betul untuk pulih semula.',

  problemHeadline: 'Adakah Anda Mengalami Tanda-Tanda Gangguan Mistik?',
  problemSubtext: 'Gangguan mistik boleh datang dalam pelbagai bentuk. Kenali simptomnya.',
  problems: [
    { title: 'Terasa ada entiti yang mengikuti atau mengganggu anda.', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80' },
    { title: 'Sukar tidur, mimpi ngeri berulang, atau tidur yang tidak lena.', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
    { title: 'Badan lemah, berat, atau sakit tanpa punca perubatan yang jelas.', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { title: 'Emosi tidak stabil — mudah marah, menangis atau berasa putus asa.', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80' },
    { title: 'Ibadah terasa berat, sukar fokus solat atau membaca Al-Quran.', img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rumah terasa tidak selesa, ada gangguan bunyi atau kejadian pelik.', img: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=600&q=80' },
  ],

  matlamatHeadline: 'Matlamat Rawatan Gangguan Mistik ESyifaa',
  goals: [
    'Mengenal pasti jenis gangguan mistik yang anda hadapi melalui diagnos percuma.',
    'Mengurangkan dan membuang pengaruh entiti atau gangguan yang ada.',
    'Memulihkan ketenangan rohani, emosi dan ibadah harian.',
    'Melindungi diri, keluarga dan rumah dari gangguan berulang.',
    'Memberi panduan amalan harian yang berkesan sebagai benteng diri.',
  ],

  ctaHeadline: 'Jangan Biarkan Gangguan Mistik Terus Mencuri Ketenangan Hidup Anda',
  ctaSubtext: 'Mula dengan diagnos percuma. Perawat kami akan bantu kenal pasti apa yang sedang anda hadapi — tiada obligasi, tiada bayaran awal.',

  faqs: [
    { q: 'Apa beza gangguan mistik dengan penyakit biasa?', a: 'Gangguan mistik selalunya tidak dapat dikesan oleh ujian perubatan konvensional. Ia memberi kesan kepada emosi, rohani dan fizikal serentak, dan sering berulang walaupun sudah dirawat secara perubatan.' },
    { q: 'Bolehkah gangguan mistik mempengaruhi lebih dari seorang dalam keluarga?', a: 'Ya. Sesetengah gangguan boleh merebak kepada ahli keluarga yang lain. Perawat akan menilai situasi semasa diagnos.' },
    { q: 'Bagaimana rawatan dilakukan dari jauh?', a: 'Melalui kaedah rawatan jarak jauh menggunakan bacaan Al-Quran dan Asmaul Husna. Badan pesakit akan merespon walaupun perawat berada di lokasi berbeza.' },
    { q: 'Berapa sesi diperlukan untuk sembuh?', a: 'Bergantung kepada tahap dan jenis gangguan. Sesetengah kes pulih dalam 1-2 sesi, ada yang memerlukan rawatan susulan.' },
    { q: 'Apakah yang perlu saya lakukan selepas rawatan?', a: 'Perawat akan berikan panduan lengkap termasuk amalan harian, air berisian dan garam untuk penerusan ikhtiar di rumah.' },
  ],

  closingHeadline: 'Ketenangan Itu Hak Anda — Jangan Biarkan Gangguan Merampasnya',
  closingParagraphs: [
    'Apa yang anda rasa itu nyata. Anda tidak gila, dan anda tidak berseorangan dalam menghadapi ini.',
    'ESyifaa ada untuk membantu anda mendapatkan semula ketenangan jiwa, kekuatan rohani dan kehidupan yang normal.',
    'Mulakan dengan diagnos percuma hari ini. Langkah pertama yang paling mudah.',
  ],
};

export default function GangguanMistikPage() {
  return <SalespageTemplate {...content} />;
}
