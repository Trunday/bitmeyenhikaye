import User from "../../models/User.js";

export default async function registerPost(req, res) {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email zaten kayıtlı." });

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
}
