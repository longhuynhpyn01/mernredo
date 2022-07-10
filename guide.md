1. Cài đặt

- npm i express jsonwebtoken mongoose dotenv argon2 cors bcryptjs
  -> jsonwebtoken để quản lí login, logout, authentication
  -> mongoose là object relational model để nói chuyện từ server sang database
  -> dotenv để lấy biến môi trường
  -> argon2 để hash password của user vào trong database
  -> cors để cho phép frontend nói chuyện với backend

2. npm i --save-dev nodemon
   -> tự động khởi động lại server khi có thay đổi

3. Bên phía client

- npm i react-bootstrap bootstrap axios react-router-dom
- Đưa import 'bootstrap/dist/css/bootstrap.min.css'; vào index.js

4. Bootswatch

- Có những theme cho bootstrap làm cho đẹp hơn
- Muốn sử dụng thì thông qua CDN https://www.jsdelivr.com/package/npm/bootswatch
  -> chọn theme muốn sử dụng
- Comment dòng import bootstrap trong index.js và thêm
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/minty/bootstrap.min.css" integrity="sha256-X08VWhrLbfhaM0zE3n7Q7Mg9YVevZcIBFzpvSCWAWmo=" crossorigin="anonymous">
vào public.index.html

5. Liên kết giữa client và server

- Khi ta thực hiện hàm loginUser trong LoginForm để có thể gửi request từ localhost:3000 đến localhost:5000 thì bị block do an ninh chuẩn của web app thì nó không cho phép
  -> vào file server/index.js thêm
  import cors from "cors";
  app.use(cors());

6. Lấy icon bootstrap tại https://icons.getbootstrap.com/icons/share-fill/
