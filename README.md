# 20201_PTPMPT_LTU15C_Nhom02
## Giới thiệu hệ thống
Đây là một chat web đơn giản cho phép chat 1-1 hoặc chat với một nhóm người
# Thành viên nhóm 2:
- Dương Trần Hoài Sơn	20168781
- Nguyễn Phúc Quý	20168774
- Phạm Minh Hoàng	20168214
- Hoàng Quốc Huy	20168228
## Công nghệ sử dụng
- Server: [ExpressJS](https://expressjs.com/), [Socket.io](https://socket.io/)
- Client: [ReactJS](https://reactjs.org/), [React-bootstrap](https://react-bootstrap.github.io/), [Socket.io-client](https://www.npmjs.com/package/socket.io-client)
## Set up
* Cài đặt docker (Có thể xem đường [link](https://docs.docker.com/get-docker/) này)
* Cài đặt docker compose (Có thể xem đường [link](https://docs.docker.com/compose/install/) này)
* Clone project về máy
```
git clone https://github.com/DuongSonn/20201_PTPMPT_LTU15C_Nhom02.git
```
* Vào folder api và tạo file .env
```
DB_URL=mongodb://mongo/PTPMPT
CLIENT_URL=http://localhost:3000
```
* Vào folder client vào tạo file .env
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_SOCKET_URL=http://localhost:8080
```
* Mở folder chứa code và chạy lệnh
```
docker-compose up
```
