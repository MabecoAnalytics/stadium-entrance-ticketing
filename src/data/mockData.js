// Mock data for the CFM Stadium Entrance Management demo.
// Everything here is hardcoded or deterministically generated in-memory.
// No network calls, no persistence — safe for an offline boardroom demo.

export const CFM_NAME = 'Portos e Caminhos de Ferro de Moçambique'

export const PAYMENT_METHODS = [
  {
    id: 'mpesa',
    label: 'M-Pesa',
    color: '#16A34A',
    highlight: 'Mais popular',
    ussd: '*150*00#',
  },
  {
    id: 'emola',
    label: 'e-Mola',
    color: '#7C3AED',
    highlight: null,
    ussd: '*898#',
  },
  {
    id: 'mkesh',
    label: 'mKesh',
    color: '#D97706',
    highlight: null,
    ussd: '*161#',
  },
]

export const TICKET_CATEGORIES = [
  { id: 'geral', label: 'Geral', price: 350 },
  { id: 'vip', label: 'VIP', price: 850 },
  { id: 'camarote', label: 'Camarote', price: 1500 },
]

export const EVENTS = [
  {
    id: 'evt-1',
    name: 'Ferroviário vs Desportivo Maputo',
    date: '2025-06-28',
    dateLabel: '28 Jun 2025',
    time: '18:30',
    stadium: 'Estádio da Machava',
    section: 'Machava, Maputo',
    capacity: 5000,
    sold: 3847,
    validated: 2134,
    revenue: 1623450,
    status: 'upcoming',
  },
  {
    id: 'evt-2',
    name: 'Costa do Sol vs Liga Muçulmana',
    date: '2025-07-05',
    dateLabel: '05 Jul 2025',
    time: '16:00',
    stadium: 'Estádio da Machava',
    section: 'Machava, Maputo',
    capacity: 5000,
    sold: 1920,
    validated: 0,
    revenue: 742800,
    status: 'upcoming',
  },
  {
    id: 'evt-3',
    name: 'Ferroviário vs Black Bulls',
    date: '2025-07-19',
    dateLabel: '19 Jul 2025',
    time: '15:30',
    stadium: 'Estádio da Machava',
    section: 'Machava, Maputo',
    capacity: 5000,
    sold: 980,
    validated: 0,
    revenue: 386400,
    status: 'upcoming',
  },
]

// Completed event used on the post-event report screen.
export const PAST_EVENT = {
  id: 'evt-0',
  name: 'Ferroviário vs Matchedje',
  date: '2025-05-17',
  dateLabel: '17 Mai 2025',
  time: '15:30',
  stadium: 'Estádio da Machava',
  capacity: 5000,
  sold: 4680,
  attendance: 4412,
  unused: 268,
  incidents: 7,
  grossRevenue: 2077300,
  ivaRate: 0.16,
  revenueByCategory: [
    { id: 'geral', label: 'Geral', amount: 1176000, tickets: 3360 },
    { id: 'vip', label: 'VIP', amount: 663000, tickets: 780 },
    { id: 'camarote', label: 'Camarote', amount: 238300, tickets: 159 },
  ],
  paymentBreakdown: [
    { id: 'mpesa', label: 'M-Pesa', amount: 1412564, count: 3182, pct: 68 },
    { id: 'emola', label: 'e-Mola', amount: 456806, count: 1030, pct: 22 },
    { id: 'mkesh', label: 'mKesh', amount: 207930, count: 468, pct: 10 },
  ],
}

const FIRST_NAMES = [
  'Armando', 'Carlos', 'Fátima', 'Amélia', 'Júlio', 'Ivone', 'Nelson', 'Graça',
  'Alberto', 'Cremilda', 'Sérgio', 'Ivete', 'Domingos', 'Belarmino', 'Custódia',
  'Aida', 'Elias', 'Zainabo', 'Momade', 'Suzana', 'Filomena', 'Anastácia',
  'Baltazar', 'Celeste', 'Deolinda', 'Estêvão', 'Feliciano', 'Guilhermina',
  'Hortência', 'Inácio', 'Jacinto', 'Lúcia', 'Manuel', 'Noémia', 'Osvaldo',
]

const LAST_NAMES = [
  'Mussa', 'Machava', 'Cossa', 'Sitoe', 'Tembe', 'Muianga', 'Nhaca', 'Chissano',
  'Matsinhe', 'Uamusse', 'Macuácua', 'Guambe', 'Bila', 'Nhampossa', 'Cuamba',
  'Langa', 'Zavale', 'Mabjaia', 'Mondlane', 'Massinga', 'Manhiça', 'Chirinza',
  'Novela', 'Sumbana', 'Wamusse',
]

// Simple deterministic PRNG so the seeded dataset is stable across renders.
function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rng = mulberry32(20250628)

function pick(arr) {
  return arr[Math.floor(rng() * arr.length)]
}

function randomPhone() {
  const prefixes = ['82', '83', '84', '85', '86', '87']
  const prefix = pick(prefixes)
  const mid = String(Math.floor(rng() * 900) + 100)
  const end = String(Math.floor(rng() * 9000) + 1000)
  return `+258 ${prefix} ${mid} ${end}`
}

function randomFullName() {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`
}

function maskName(fullName) {
  const parts = fullName.split(' ')
  const first = parts[0]
  const last = parts[parts.length - 1]
  return `${first[0]}. ${last}`
}

function methodByWeight() {
  const r = rng()
  if (r < 0.68) return 'mpesa'
  if (r < 0.9) return 'emola'
  return 'mkesh'
}

function categoryByWeight() {
  const r = rng()
  if (r < 0.72) return TICKET_CATEGORIES[0]
  if (r < 0.93) return TICKET_CATEGORIES[1]
  return TICKET_CATEGORIES[2]
}

export function generateRecentTransactions(count = 10) {
  const now = new Date('2025-06-28T17:52:00')
  const rows = []
  for (let i = 0; i < count; i++) {
    const fullName = randomFullName()
    const category = categoryByWeight()
    const methodId = methodByWeight()
    const method = PAYMENT_METHODS.find((m) => m.id === methodId)
    const minsAgo = i * 3 + Math.floor(rng() * 3)
    const time = new Date(now.getTime() - minsAgo * 60000)
    rows.push({
      id: `TXN-${(9000 - i * 7).toString().padStart(5, '0')}`,
      name: maskName(fullName),
      method: method.label,
      methodColor: method.color,
      amount: category.price,
      category: category.label,
      time: time.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      status: rng() > 0.05 ? 'Confirmado' : 'Pendente',
    })
  }
  return rows
}

export const RECENT_TRANSACTIONS = generateRecentTransactions(10)

export const GATES = [
  { id: 'gate-n1', label: 'Entrada Norte — Porta 1', validated: 412, invalid: 9, status: 'Activa' },
  { id: 'gate-n2', label: 'Entrada Norte — Porta 2', validated: 388, invalid: 14, status: 'Activa' },
  { id: 'gate-n3', label: 'Entrada Norte — Porta 3', validated: 356, invalid: 7, status: 'Activa' },
  { id: 'gate-s1', label: 'Entrada Sul — Porta 1', validated: 341, invalid: 11, status: 'Activa' },
  { id: 'gate-s2', label: 'Entrada Sul — Porta 2', validated: 0, invalid: 0, status: 'Offline' },
  { id: 'gate-v1', label: 'Entrada VIP — Porta 1', validated: 198, invalid: 2, status: 'Activa' },
  { id: 'gate-v2', label: 'Entrada VIP — Porta 2', validated: 174, invalid: 3, status: 'Activa' },
]

export const SALES_BY_PAYMENT_METHOD = [
  { id: 'mpesa', label: 'M-Pesa', pct: 68, color: '#16A34A' },
  { id: 'emola', label: 'e-Mola', pct: 22, color: '#7C3AED' },
  { id: 'mkesh', label: 'mKesh', pct: 10, color: '#D97706' },
]

// Entry timeline for the admin dashboard: 17:00 -> 19:30 in 15-min steps,
// with a pre-match peak between 18:15 and 18:45.
export const ENTRIES_TIMELINE = [
  { time: '17:00', entries: 42 },
  { time: '17:15', entries: 78 },
  { time: '17:30', entries: 135 },
  { time: '17:45', entries: 210 },
  { time: '18:00', entries: 318 },
  { time: '18:15', entries: 512 },
  { time: '18:30', entries: 486 },
  { time: '18:45', entries: 397 },
  { time: '19:00', entries: 188 },
  { time: '19:15', entries: 94 },
  { time: '19:30', entries: 41 },
]

// Full-arc entry timeline used on the post-event report (includes late arrivals tail).
export const FULL_EVENT_TIMELINE = [
  { time: '13:30', entries: 18 },
  { time: '13:45', entries: 34 },
  { time: '14:00', entries: 61 },
  { time: '14:15', entries: 97 },
  { time: '14:30', entries: 156 },
  { time: '14:45', entries: 245 },
  { time: '15:00', entries: 402 },
  { time: '15:15', entries: 588 },
  { time: '15:30', entries: 421 },
  { time: '15:45', entries: 289 },
  { time: '16:00', entries: 174 },
  { time: '16:15', entries: 98 },
  { time: '16:30', entries: 52 },
  { time: '16:45', entries: 23 },
]

export const ADMIN_KPIS = {
  ticketsSold: 3847,
  ticketsCapacity: 5000,
  totalRevenue: 1623450,
  occupancyRate: 76.9,
  validatedEntries: 2134,
}

// Manual thousands-separator formatting (dot, Portuguese-style): relying on
// toLocaleString('pt-PT') is inconsistent for 4-digit numbers because CLDR's
// minimumGroupingDigits for pt-PT suppresses the separator below 10 000.
export function formatNumber(value) {
  const rounded = Math.round(value)
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatMTn(value) {
  return `MTn ${formatNumber(value)}`
}

export function generateTicketId() {
  const chars = '0123456789abcdef'
  const seg = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${seg(8)}-${seg(4)}-${seg(4)}-${seg(4)}-${seg(12)}`
}

export const MOCK_BUYER_DEFAULTS = {
  name: '',
  phone: '+258 84 ',
  email: '',
}

export const INVALID_SCAN_REASONS = [
  'Bilhete já utilizado',
  'Bilhete inválido',
]

export const SCAN_VALID_SAMPLES = [
  { name: 'Armando Mussa', category: 'Geral', event: 'Ferroviário vs Desportivo Maputo' },
  { name: 'Fátima Cossa', category: 'VIP', event: 'Ferroviário vs Desportivo Maputo' },
  { name: 'Nelson Tembe', category: 'Camarote', event: 'Ferroviário vs Desportivo Maputo' },
  { name: 'Ivete Sitoe', category: 'Geral', event: 'Ferroviário vs Desportivo Maputo' },
  { name: 'Domingos Machava', category: 'VIP', event: 'Ferroviário vs Desportivo Maputo' },
]
