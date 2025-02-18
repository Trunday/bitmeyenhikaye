# Bitmeyen Hikaye

"Bitmeyen Hikaye", kullanıcının interaktif bir hikayeyi deneyimleyebileceği, hikayenin ilerleyişinde verilen seçimlerle farklı sonlara ulaşılabilen dinamik bir web uygulamasıdır.

## İçindekiler

* [Özellikler](https://chatgpt.com/c/67b50651-2760-8011-85cd-cda7157aae2a#%C3%B6zellikler)
* [Kullanılan Teknolojiler](https://chatgpt.com/c/67b50651-2760-8011-85cd-cda7157aae2a#kullan%C4%B1lan-teknolojiler)
* [Kurulum](https://chatgpt.com/c/67b50651-2760-8011-85cd-cda7157aae2a#kurulum)
* [Kullanım](https://chatgpt.com/c/67b50651-2760-8011-85cd-cda7157aae2a#kullan%C4%B1m)
* [Geliştirme ve API](https://chatgpt.com/c/67b50651-2760-8011-85cd-cda7157aae2a#geli%C5%9Ftirme-ve-api)
* [Lisans](https://chatgpt.com/c/67b50651-2760-8011-85cd-cda7157aae2a#lisans)

## Özellikler

* **Dinamik Hikaye Akışı:** Kullanıcının verdiği kararlara göre hikaye farklı yönlere evriliyor.
* **Etkileşimli Deneyim:** Karakter seçimleri ve anlık karar verme mekanizması ile sürükleyici bir deneyim.
* **Modern Arayüz:** React ile oluşturulmuş kullanıcı dostu ve responsive tasarım.
* **Gerçek Zamanlı İletişim:** Node.js ve WebSocket/RESTful API'ler sayesinde anlık veri akışı.
* **Ölçeklenebilir Mimari:** MERN stack kullanılarak geliştirilen yapı ile ileriye dönük genişletilebilirlik.

## Kullanılan Teknolojiler

* **Frontend:** React
* **Backend:** Node.js, Express.js
* **Veritabanı:** MongoDB
* **Diğer:**
  * JWT (Kullanıcı kimlik doğrulama)
  * WebSocket (İsteğe bağlı, gerçek zamanlı etkileşim için)

## Kurulum

### Ön Gereksinimler

* Node.js (en az 14.x sürüm)
* MongoDB (lokal veya bulut tabanlı)
* Git yüklü olması

### Adım Adım Kurulum

1. **Repository'i Klonlayın:**

   ```bash
   git clone https://github.com/trunday/bitmeyenhikaye.git
   cd bitmeyenhikaye
   ```
2. **Backend için Paketleri Yükleyin:**

   ```bash
   cd backend
   npm install
   ```
3. **Frontend için Paketleri Yükleyin:**

   ```bash
   cd ../frontend
   npm install
   ```
4. **Ortam Değişkenlerini Ayarlayın:**

   * `backend` dizininde `.env` dosyası oluşturun ve aşağıdaki örneğe benzer şekilde ayarlarınızı ekleyin:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
   * `frontend` dizininde (örneğin `.env` dosyası) API URL'sini belirtin:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```
5. **Veritabanını Başlatın:**

   * MongoDB’yi lokal çalıştırıyorsanız:
     ```bash
     mongod
     ```
   * Eğer MongoDB Atlas kullanıyorsanız, bağlantı URI’nizi `.env` dosyanıza eklediğinizden emin olun.
6. **Backend Servisini Başlatın:**

   ```bash
   cd backend
   npm run dev
   ```

   Sunucu çalıştıktan sonra `http://localhost:5000` adresinden API’ye erişebilirsiniz.
7. **Frontend Servisini Başlatın:**

   ```bash
   cd ../frontend
   npm start
   ```

   Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Kullanım

Projeyi başarıyla çalıştırdıktan sonra, tarayıcınızda `http://localhost:3000` adresine gidin. Ana sayfada hikayenizi okumaya başlayabilir, karşılaştığınız seçim noktalarında tercihlerinizi yaparak hikayenin farklı akışlarını keşfedebilirsiniz.

## Geliştirme ve API

Eğer projeye yeni özellikler eklemek istiyorsanız veya API isteklerini test etmek istiyorsanız, aşağıdaki adımları takip edebilirsiniz:

* **Postman veya cURL kullanarak API testleri yapabilirsiniz.**
* **Yeni hikayeler eklemek için MongoDB'ye manuel veri ekleyebilir veya bir yönetici paneli geliştirebilirsiniz.**
* **Gerçek zamanlı etkileşimler için WebSocket entegrasyonu ekleyebilirsiniz.**

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasını inceleyebilirsiniz.
