users = [{
  email: "guest@gst.gst",
  password: "guest111",
  role: 0,
},{
  email: "student@st.st",
  password: "student1",
  role: 0,
}, {
  email: "elder@el.el",
  password: "elder111",
  role: 0,
}, {
  email: "teacher@th.th",
  password: "teacher1",
  role: 3,
  key: "11111111"
}]

users.each do |u|
  User.create(u)
end

