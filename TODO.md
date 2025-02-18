# TODO

Bu dosya, "Bitmeyen Hikaye" projesinde yapılması gereken işleri ve önerilen adımları içermektedir.

## 1. Hikaye İçeriğini Dinamik Hale Getirme

### Açıklama

`Story.tsx` dosyasındaki hikaye içeriğini dinamik hale getirmek için backend'den veri çekilmesi gerekmektedir. Bu, hikaye içeriğinin ve seçeneklerin veritabanından alınmasını sağlar.

### Yapılacaklar

- `useEffect` kullanarak API çağrısı yapın ve hikaye içeriğini güncelleyin.
- Backend'de hikaye içeriğini sağlayacak bir endpoint oluşturun.

### Örnek

```javascript
// Story.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Story = () => {
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios.get('/api/stories/1')
      .then(response => setStory(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {story ? (
        <div>
          <h1>{story.title}</h1>
          <p>{story.content}</p>
          {/* Seçenekler burada render edilecek */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Story;
```

## 2. Backend API Geliştirme

### Açıklama

Backend tarafında hikaye içeriğini ve seçenekleri sağlayacak API endpoint'leri oluşturulmalıdır.

### Yapılacaklar

- `/api/stories/:id` gibi bir endpoint oluşturun.
- Bu endpoint, belirli bir hikayeyi ve onun seçeneklerini döndürmelidir.

### Örnek

```javascript
// backend/routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const { getStoryById } = require('../controllers/storyController');

router.get('/:id', getStoryById);

module.exports = router;

// backend/controllers/storyController.js
const Story = require('../models/Story');

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStoryById };
```

## 3. Veritabanı Entegrasyonu

### Açıklama

MongoDB kullanarak hikaye verilerini saklayabilir ve yönetebilirsiniz.

### Yapılacaklar

- Hikaye verilerini içeren bir koleksiyon oluşturun.
- CRUD işlemleri için gerekli fonksiyonları yazın.

### Örnek

```javascript
// backend/models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }]
});

module.exports = mongoose.model('Story', storySchema);
```

## 4. Kullanıcı Kimlik Doğrulama

### Açıklama

JWT kullanarak kullanıcı kimlik doğrulama mekanizması ekleyebilirsiniz.

### Yapılacaklar

- Kullanıcıların giriş yapmasını sağlayacak bir endpoint oluşturun.
- JWT kullanarak kullanıcı kimlik doğrulama işlemlerini gerçekleştirin.

### Örnek

```javascript
// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { loginUser };
```

## 5. Gerçek Zamanlı İletişim

### Açıklama

WebSocket kullanarak gerçek zamanlı etkileşimler ekleyebilirsiniz.

### Yapılacaklar

- Kullanıcıların aynı hikayeyi birlikte deneyimlemesini sağlayacak WebSocket entegrasyonu ekleyin.

### Örnek

```javascript
// backend/server.js
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
```

Bu adımları takip ederek projenizi daha da geliştirebilir ve kullanıcılar için daha zengin bir deneyim sunabilirsiniz.
