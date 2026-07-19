require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users
    await User.deleteMany({ 
      email: { $in: [
        'test.member@campusos.app',
        'test.lead@campusos.app', 
        'test.faculty@campusos.app'
      ]}
    });

    const commonPassword = 'Test@123';
    const hashedPassword = await bcrypt.hash(commonPassword, 10);

    // Create test users
    const users = [
      {
        fullName: 'Test Member',
        email: 'test.member@campusos.app',
        password: hashedPassword,
        department: 'Computer Science',
        year: 2,
        role: 'Student'
      },
      {
        fullName: 'Test Lead',
        email: 'test.lead@campusos.app',
        password: hashedPassword,
        department: 'Computer Science',
        year: 3,
        role: 'Club Lead'
      },
      {
        fullName: 'Test Faculty',
        email: 'test.faculty@campusos.app',
        password: hashedPassword,
        department: 'Computer Science',
        year: 4,
        role: 'Faculty Coordinator'
      }
    ];

    await User.insertMany(users);
    console.log('✅ Test users created successfully:');
    console.log('   - test.member@campusos.app (Student/Member)');
    console.log('   - test.lead@campusos.app (Club Lead)');
    console.log('   - test.faculty@campusos.app (Faculty Coordinator)');
    console.log('   Common password: Test@123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
