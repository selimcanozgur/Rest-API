# REST API Dökümantasyonu

## Genel Bakış

Bu, Node.js kullanılarak oluşturulmuş bir REST API'dir. API, kullanıcı yönetimi ve ürün işlemlerini destekler. Hem kullanıcılar hem de ürünler için CRUD (Create, Read, Update, Delete) işlemleri yapılabilir. Ayrıca kimlik doğrulama, yetkilendirme ve hata yönetimi özelliklerine sahiptir.

## Özellikler

### Kullanıcı İşlemleri

- **Kullanıcı Kayıt Olma (Register)**: Yeni kullanıcılar kayıt olabilir.
- **Kullanıcı Giriş Yapma (Login)**: Mevcut kullanıcılar giriş yapabilir.
- **Kullanıcı Silme (Delete User)**: Bir kullanıcı sistemden silinebilir.
- **Kullanıcı Kimlik Doğrulama (Authentication)**: JWT (JSON Web Token) ile kullanıcı kimlik doğrulama işlemi gerçekleştirilir.
- **Kullanıcı Yetkilendirme (Authorization)**: Belirli işlemler için kullanıcı rolleri bazında yetkilendirme yapılır (örneğin, admin yetkileri).

### Ürün İşlemleri

- **Ürün Listeleme (Get Products)**: Tüm ürünler listelenebilir.
- **Ürün Oluşturma (Create Product)**: Yeni ürün eklenebilir.
- **Ürün Güncelleme (Update Product)**: Var olan bir ürün güncellenebilir.
- **Ürün Silme (Delete Product)**: Bir ürün sistemden silinebilir.
- **Ürün Filtreleme (Filter Products)**: Belirli kriterlere göre ürünler filtrelenebilir (fiyat, kategori vb.).

### Hata Yönetimi

- **Error Handling**: API’de meydana gelebilecek hatalar, kullanıcı dostu mesajlarla yönetilir ve uygun HTTP durum kodları ile geri dönülür.

## Teknolojiler

- **Node.js**: Sunucu tarafı JavaScript çalıştırma ortamı.
- **Express.js**: Node.js üzerinde web uygulamaları ve API'lar geliştirmek için kullanılan hızlı ve minimal bir web çerçevesi.
- **MongoDB**: Veritabanı olarak NoSQL tabanlı MongoDB kullanıldı.
- **JWT (JSON Web Token)**: Kimlik doğrulama ve yetkilendirme için token bazlı sistem.
- **Mongoose**: MongoDB ile etkileşim için kullanılan bir ODM (Object Data Modeling) kütüphanesi.

## API Kullanımı

### Kullanıcı İşlemleri

1. **Kayıt Olma**
   - **URL**: `/api/users/register`
   - **Yöntem**: `POST`
   - **Açıklama**: Yeni bir kullanıcı oluşturur.
   - **Body Parametreleri**:
     - `username`: Kullanıcı adı
     - `email`: Kullanıcı e-posta adresi
     - `password`: Kullanıcı şifresi

2. **Giriş Yapma**
   - **URL**: `/api/users/login`
   - **Yöntem**: `POST`
   - **Açıklama**: Mevcut bir kullanıcı ile giriş yapar.
   - **Body Parametreleri**:
     - `email`: Kullanıcı e-posta adresi
     - `password`: Kullanıcı şifresi

3. **Kullanıcı Silme**
   - **URL**: `/api/users/:id`
   - **Yöntem**: `DELETE`
   - **Açıklama**: ID'si belirtilen kullanıcıyı siler.
   - **Parametreler**:
     - `id`: Silinecek kullanıcının ID'si.

### Ürün İşlemleri

1. **Ürün Listeleme**
   - **URL**: `/api/products`
   - **Yöntem**: `GET`
   - **Açıklama**: Tüm ürünleri listeler.

2. **Ürün Oluşturma**
   - **URL**: `/api/products`
   - **Yöntem**: `POST`
   - **Açıklama**: Yeni bir ürün ekler.
   - **Body Parametreleri**:
     - `name`: Ürün adı
     - `price`: Ürün fiyatı
     - `category`: Ürün kategorisi

3. **Ürün Güncelleme**
   - **URL**: `/api/products/:id`
   - **Yöntem**: `PUT`
   - **Açıklama**: ID'si belirtilen ürünü günceller.
   - **Parametreler**:
     - `id`: Güncellenecek ürünün ID'si.
     - **Body**: Güncellenmek istenen ürün bilgileri.

4. **Ürün Silme**
   - **URL**: `/api/products/:id`
   - **Yöntem**: `DELETE`
   - **Açıklama**: ID'si belirtilen ürünü siler.
   - **Parametreler**:
     - `id`: Silinecek ürünün ID'si.

### Ürün Filtreleme

- **URL**: `/api/products?price_min=&price_max=&category=`
- **Yöntem**: `GET`
- **Açıklama**: Fiyat aralığı veya kategoriye göre ürünleri filtreler.
- **Query Parametreleri**:
  - `price_min`: Minimum fiyat
  - `price_max`: Maksimum fiyat
  - `category`: Ürün kategorisi

## Kimlik Doğrulama ve Yetkilendirme

- Kullanıcılar, API'yi kullanabilmek için JWT kullanarak kimlik doğrulaması yapmalıdır.
- Admin yetkisi gerektiren işlemler için, kullanıcının admin rolüne sahip olması gerekmektedir.

## Kurulum

1. **Depoyu Klonlayın**:
   ```bash
   git clone <repo-url>
