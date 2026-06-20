import { deleteApp, initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3GVtobfcYO_XGpmhz88IHCB5BirqsTBg",
  authDomain: "beyviptranslation-fefe0.firebaseapp.com",
  projectId: "beyviptranslation-fefe0",
  storageBucket: "beyviptranslation-fefe0.firebasestorage.app",
  messagingSenderId: "209205659669",
  appId: "1:209205659669:web:91845bde175c8689f0e61c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const now = new Date().toISOString();

const img = {
  hero: "/beyvip/hero.png",
  about: "/beyvip/about.png",
  passport: "/beyvip/passport.png",
  legal: "/beyvip/legal.png",
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const contactInfo = {
  id: "main",
  address: "İstanbul / Türkiye",
  phone: "+90 533 427 63 83",
  whatsapp: "+90 533 092 34 76",
  email: "beyviptranslation@gmail.com",
  workingHours: "Pazartesi - Cumartesi: 09:00 - 19:00",
  socialMedia: {
    instagram: "https://www.instagram.com/beyviptranslation",
  },
  mapCoordinates: {
    lat: 41.0082,
    lng: 28.9784,
  },
  updatedAt: now,
};

const categories = [
  {
    id: "resmi-evrak",
    name: "Resmi Evrak",
    description: "Kimlik, pasaport, nüfus kayıt ve kurum evrakları için tercüme süreçleri.",
    icon: "file-text",
    color: "#c3953a",
    order: 1,
    isActive: true,
    createdAt: now,
  },
  {
    id: "noter-onayi",
    name: "Noter Onayı",
    description: "Yeminli tercüme ve noter onayına uygun belge hazırlığı.",
    icon: "shield",
    color: "#111111",
    order: 2,
    isActive: true,
    createdAt: now,
  },
  {
    id: "vize-ikamet",
    name: "Vize & İkamet",
    description: "Konsolosluk ve ikamet başvuruları için dosya odaklı tercüme.",
    icon: "globe",
    color: "#6d665d",
    order: 3,
    isActive: true,
    createdAt: now,
  },
];

const galleryItems = [
  {
    id: "pasaport-tercumesi",
    title: "Pasaport Tercümesi",
    description: "Vize, ikamet ve resmi başvurular için pasaport çevirisi hazırlığı.",
    categoryId: "vize-ikamet",
    imageUrl: img.passport,
    thumbnailUrl: img.passport,
    tags: ["pasaport", "vize", "ikamet"],
    isActive: true,
    isFeatured: true,
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "noter-onayli-belge",
    title: "Noter Onaylı Tercüme",
    description: "Noter onayına uygun resmi belge tercümesi ve teslim süreci.",
    categoryId: "noter-onayi",
    imageUrl: img.legal,
    thumbnailUrl: img.legal,
    tags: ["noter", "yeminli tercüme", "resmi belge"],
    isActive: true,
    isFeatured: true,
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "tercume-ofisi-calisma-alani",
    title: "BEYVIP Çalışma Alanı",
    description: "Belgelerinizin düzenli ve kontrollü şekilde hazırlandığı profesyonel çalışma ortamı.",
    categoryId: "resmi-evrak",
    imageUrl: img.about,
    thumbnailUrl: img.about,
    tags: ["ofis", "evrak", "tercüme"],
    isActive: true,
    isFeatured: true,
    order: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "vize-evrak-dosyasi",
    title: "Vize Evrak Dosyası",
    description: "Konsolosluk dosyaları için kimlik, nüfus ve destek evraklarının tercüme hazırlığı.",
    categoryId: "vize-ikamet",
    imageUrl: img.hero,
    thumbnailUrl: img.hero,
    tags: ["vize", "konsolosluk", "dosya"],
    isActive: true,
    isFeatured: false,
    order: 4,
    createdAt: now,
    updatedAt: now,
  },
];

const news = [
  {
    id: "pasaport-tercumesi-ne-zaman-gerekir",
    title: "Pasaport Tercümesi Ne Zaman Gerekir?",
    subtitle: "Vize, ikamet ve resmi başvuru süreçlerinde pasaport tercümesinin rolü.",
    description: "Pasaport tercümesi hangi kurumlarda istenir, hangi sayfalar çevrilir ve süreç nasıl hızlanır?",
    content: `
      <h2>Pasaport tercümesi hangi durumlarda istenir?</h2>
      <p>Pasaport tercümesi vize, ikamet, çalışma izni, eğitim başvurusu ve bazı resmi kurum işlemlerinde talep edilebilir.</p>
      <p>Başvuru yapılacak kurumun istediği format, hedef dil ve noter onayı ihtiyacı baştan kontrol edilmelidir. Net fotoğraf veya PDF paylaşımı süreci hızlandırır.</p>
      <ul>
        <li>Vize ve konsolosluk başvuruları</li>
        <li>İkamet ve çalışma izni dosyaları</li>
        <li>Resmi kurum başvuruları</li>
      </ul>
    `,
    imageUrl: img.passport,
    tags: ["pasaport tercümesi", "vize", "ikamet"],
    featured: true,
    isActive: true,
    order: 1,
    category: "Resmi Evrak",
    author: "BEYVIP Translation Office",
    slug: "pasaport-tercumesi-ne-zaman-gerekir",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "noter-onayli-tercume-icin-belge-hazirligi",
    title: "Noter Onaylı Tercüme İçin Belge Hazırlığı",
    subtitle: "Noter onayı gereken belgelerde tercüme öncesi kontrol edilmesi gerekenler.",
    description: "Noter onaylı tercümede belge netliği, hedef dil ve kullanım amacı neden önemlidir?",
    content: `
      <h2>Noter onayı öncesi belge kontrolü</h2>
      <p>Noter onaylı tercüme için belgenin okunabilir, eksiksiz ve resmi kullanım amacına uygun olması gerekir.</p>
      <p>Belge türü, hedef dil, teslim süresi ve noter onayı ihtiyacı önceden netleşirse süreç daha düzenli ilerler.</p>
      <ul>
        <li>Belgenin tüm sayfaları okunabilir olmalı</li>
        <li>İsim, tarih ve numara detayları kontrol edilmeli</li>
        <li>Apostil veya ek onay ihtiyacı ayrıca değerlendirilmelidir</li>
      </ul>
    `,
    imageUrl: img.legal,
    tags: ["noter onayı", "yeminli tercüme", "resmi evrak"],
    featured: false,
    isActive: true,
    order: 2,
    category: "Noter Onayı",
    author: "BEYVIP Translation Office",
    slug: "noter-onayli-tercume-icin-belge-hazirligi",
    publishedAt: now,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: now,
  },
  {
    id: "vize-evraklari-tercumesinde-sik-yapilan-hatalar",
    title: "Vize Evrakları Tercümesinde Sık Yapılan Hatalar",
    subtitle: "Konsolosluk dosyalarında küçük detayların büyük etkisi olabilir.",
    description: "Vize evraklarında isim, tarih, kurum adı ve belge formatı gibi detayları neden dikkatle yönetmek gerekir?",
    content: `
      <h2>Vize dosyasında tercüme düzeni neden önemlidir?</h2>
      <p>Vize evraklarında isim, tarih, belge numarası ve kurum adı gibi detaylar başvuru dosyasının bütünlüğünü etkileyebilir.</p>
      <p>Belgenin hedef dile doğru aktarılması kadar temiz ve anlaşılır formatta teslim edilmesi de önemlidir.</p>
    `,
    imageUrl: img.hero,
    tags: ["vize evrakları", "konsolosluk", "tercüme"],
    featured: false,
    isActive: true,
    order: 3,
    category: "Vize Süreçleri",
    author: "BEYVIP Translation Office",
    slug: "vize-evraklari-tercumesinde-sik-yapilan-hatalar",
    publishedAt: now,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: now,
  },
];

const serviceAreas = [
  {
    id: "istanbul-tercume",
    name: "İstanbul Tercüme Hizmeti",
    slug: "istanbul-tercume",
    description: "İstanbul genelinde resmi evrak, pasaport, noter onaylı ve yeminli tercüme desteği.",
    content: `
      <h2>İstanbul'da BEYVIP tercüme desteği</h2>
      <p>Belgelerinizi WhatsApp veya e-posta üzerinden ileterek hızlı teklif alabilir, teslim sürecini baştan netleştirebilirsiniz.</p>
      <p>Pasaport, kimlik, diploma, transkript, sözleşme, vekaletname ve vize evrakları için destek sunulur.</p>
    `,
    imageUrl: img.about,
    isActive: true,
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "online-tercume",
    name: "Online Belge Gönderimi",
    slug: "online-tercume",
    description: "Türkiye genelinden belge fotoğrafı veya PDF paylaşarak tercüme sürecinizi başlatın.",
    content: `
      <h2>Online tercüme süreci</h2>
      <p>Belgenizin net fotoğrafını veya PDF dosyasını gönderin; hedef dil, onay ihtiyacı ve teslim süresi birlikte değerlendirilsin.</p>
    `,
    imageUrl: img.hero,
    isActive: true,
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "vize-ikamet-dosyalari",
    name: "Vize ve İkamet Dosyaları",
    slug: "vize-ikamet-dosyalari",
    description: "Konsolosluk, ikamet ve seyahat dosyaları için başvuru odaklı tercüme akışı.",
    content: `
      <h2>Vize ve ikamet başvuruları</h2>
      <p>Konsolosluk dosyalarında istenen belgeler başvuru amacına göre değerlendirilir ve tercüme formatı buna göre hazırlanır.</p>
    `,
    imageUrl: img.passport,
    isActive: true,
    order: 3,
    createdAt: now,
    updatedAt: now,
  },
];

const sampleMessages = [
  {
    id: "ornek-pasaport-talebi",
    name: "Örnek Müşteri",
    email: "ornek@example.com",
    phone: "+90 5xx xxx xx xx",
    subject: "Pasaport Tercümesi - normal",
    message: "Vize başvurusu için pasaport tercümesi hakkında fiyat ve süre bilgisi almak istiyorum.",
    isRead: false,
    isArchived: false,
    priority: "low",
    status: "new",
    tags: ["ornek", "pasaport"],
    createdAt: now,
    updatedAt: now,
  },
];

async function upsert(collectionName, id, data) {
  const { id: _ignored, ...payload } = data;
  await setDoc(doc(db, collectionName, id), {
    ...payload,
    seededAt: serverTimestamp(),
    seedSource: "beyvip-seed",
  }, { merge: true });
  console.log(`✓ ${collectionName}/${id}`);
}

async function main() {
  console.log("BEYVIP Translation Firestore seed başlıyor...");

  await upsert("contact_info", contactInfo.id, contactInfo);

  for (const category of categories) {
    await upsert("gallery_categories", category.id, category);
  }

  for (const item of galleryItems) {
    await upsert("gallery_items", item.id, item);
  }

  for (const item of news) {
    await upsert("haberler", item.id || slugify(item.title), item);
  }

  for (const area of serviceAreas) {
    await upsert("hizmet_bolgeleri", area.id, area);
  }

  for (const message of sampleMessages) {
    await upsert("contact_messages", message.id, message);
  }

  await upsert("call_counter", "main", {
    id: "main",
    count: 0,
    lastCallAt: null,
    updatedAt: now,
  });

  console.log("BEYVIP seed tamamlandı.");
}

main().catch((error) => {
  console.error("Seed sırasında hata oluştu:", error);
  process.exitCode = 1;
}).finally(async () => {
  await deleteApp(app);
});
