export const CASE_STATUSES = {
  BARU: { id: 'Baru', label: 'Baru', color: '#FFFFFF', bgColor: '#3B82F6', description: 'Kes baru diterima' },
  BELUM_DIAMBIL: { id: 'Belum Diambil', label: 'Belum Diambil', color: '#1F2937', bgColor: '#F3F4F6', description: 'Kes belum diserahkan' },
  SEDANG_DIURUS: { id: 'Sedang Diurus', label: 'Sedang Diurus', color: '#FFFFFF', bgColor: '#F59E0B', description: 'Sedang diuruskan oleh pengamal' },
  TIDAK_DAPAT_DIHUBUNGI: { id: 'Tidak Dapat Dihubungi', label: 'Tidak Dapat Dihubungi', color: '#FFFFFF', bgColor: '#EF4444', description: 'Panggilan/mesej tidak berjawab' },
  PERLU_FOLLOW_UP: { id: 'Perlu Follow-up', label: 'Perlu Follow-up', color: '#FFFFFF', bgColor: '#8B5CF6', description: 'Perlukan tindakan susulan' },
  RAWATAN_SELESAI: { id: 'Rawatan Selesai', label: 'Rawatan Selesai', color: '#FFFFFF', bgColor: '#059669', description: 'Rawatan telah berjaya' },
  PELANGGAN_BATAL: { id: 'Pelanggan Batal', label: 'Pelanggan Batal', color: '#FFFFFF', bgColor: '#6B7280', description: 'Pelanggan membatalkan permohonan' },
  KES_BERULANG: { id: 'Kes Berulang', label: 'Kes Berulang', color: '#FFFFFF', bgColor: '#EC4899', description: 'Pelanggan lama membuat permohonan baru' },
  DIARKIBKAN: { id: 'Diarkibkan', label: 'Diarkibkan', color: '#9CA3AF', bgColor: '#111827', description: 'Kes telah ditutup dan disimpan' }
};

export const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 
  'Sarawak', 'Selangor', 'Terengganu', 'Wilayah Persekutuan Kuala Lumpur', 
  'Wilayah Persekutuan Putrajaya', 'Wilayah Persekutuan Labuan'
];

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  PRACTITIONER: 'practitioner'
};

export const SOURCE_OPTIONS = [
  'Facebook Ads', 'TikTok', 'Google', 'Instagram', 
  'Organic', 'Direct', 'Referral', 'Other'
];

export const ACTION_TYPES = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LOGIN: 'login',
  LOGOUT: 'logout',
  CLAIM_CASE: 'claim_case',
  STATUS_CHANGE: 'status_change'
};
