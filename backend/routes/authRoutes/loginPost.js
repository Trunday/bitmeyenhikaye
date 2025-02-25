import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default function loginPost() {
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Kullanıcı bulunamadı." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Şifre hatalı." });

      const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: { id: user._id, username: user.username, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  };
}
