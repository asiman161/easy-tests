users = [{
  email: "student@st.st",
  password: "student1",
  role: 1,
}, {
  email: "elder@el.el",
  password: "elder123",
  role: 2,
}, {
  email: "teacher@th.th",
  password: "teacher1",
  role: 3,
}]

users.each do |u|
  User.create(u)
end

