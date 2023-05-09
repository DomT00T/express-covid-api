
## Covid-19 User Management System 
โปรเจกต์นี้เป็นระบบจัดการข้อมูลผู้ใช้งาน Covid-19 โดยใช้ฐานข้อมูล MongoDB และเขียนโดยใช้ภาษา JavaScript โดยมีฟังก์ชั่นการทำงานดังนี้

- เพิ่มข้อมูลผู้ลงทะเบียน
- แสดงข้อมูลผู้ลงทะเบียนทั้งหมด
- แสดงข้อมูลผู้ลงทะเบียนจาก ID
- อัปเดตข้อมูลผู้ลงทะเบียน
- ลบข้อมูลผู้ลงทะเบียน

## การติดตั้งและใช้งาน

1.Clone โปรเจกต์นี้ลงบนเครื่องของคุณ
git clone https://github.com/<domt00m>/covid-user-management.git

2.ติดตั้ง dependencies โดยใช้ npm
cd covid-user-management
npm install

3.กำหนด URI ของ MongoDB ในไฟล์ index.js โดยแก้ไขบรรทัดนี้

    const uri = "mongodb://myUserAdmin:myUserAdmin@127.0.0.1:27017";

    *โดยแทน myUserAdmin ด้วยชื่อผู้ใช้งาน MongoDB ของคุณ และ 127.0.0.1:27017 ด้วยที่อยู่ของ MongoDB ของคุณ*

4.เริ่มต้นเซิร์ฟเวอร์
npm start

5.เข้าถึง API ผ่านทาง http://localhost:3000

## API Endpoints

POST /users/create - เพิ่มข้อมูลผู้ลงทะเบียน
GET /users - แสดงข้อมูลผู้ลงทะเบียนทั้งหมด
GET /users/:id - แสดงข้อมูลผู้ลงทะเบียนจาก id
PUT /users/update - อัปเดตข้อมูลจาก id
DELETE /users/delete ลบข้อมูลผู้ลงทะเบียนจาก id
