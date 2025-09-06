export const mockProviders = [
  {
    "name": "Dr. Maniah Sambari",
    "provider_usertype": "therapist",
    "is_inhouse": true,
    "id": 101,
    "image": "https://randomuser.me/api/portraits/women/1.jpg",
    "clinic_details": {
      "id": 1,
      "name": "Bandra Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["08:00", "08:15", "08:30"],
        "offline_slots": ["09:00", "09:15"],
        "both_slots": ["10:00", "10:15"],
        "online_booked_slots": ["08:30"],
        "offline_booked_slots": ["09:15"],
        "blocked_slots": [{"slot": "11:00", "reason": "Unwell"}]
      }
    ]
  },
  {
    "name": "Anjana Thattil",
    "provider_usertype": "psychiatrist",
    "is_inhouse": false,
    "id": 102,
    "image": "https://randomuser.me/api/portraits/women/2.jpg",
    "clinic_details": {
      "id": 2,
      "name": "Andheri Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["10:00", "10:15", "10:30"],
        "offline_slots": ["11:00", "11:15"],
        "both_slots": ["12:00"],
        "online_booked_slots": ["10:30"],
        "offline_booked_slots": ["11:15"],
        "blocked_slots": [{"slot": "12:00", "reason": "Other"}]
      }
    ]
  },
  {
    "name": "Dr. Amiya Banerjee",
    "provider_usertype": "psychiatrist",
    "is_inhouse": true,
    "id": 103,
    "image": "https://randomuser.me/api/portraits/men/3.jpg",
    "clinic_details": {
      "id": 3,
      "name": "Juhu Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["14:00", "14:15", "14:30"],
        "offline_slots": ["15:00", "15:15"],
        "both_slots": ["16:00"],
        "online_booked_slots": ["14:30"],
        "offline_booked_slots": ["15:15"],
        "blocked_slots": [{"slot": "17:00", "reason": "Other"}]
      }
    ]
  },
  {
    "name": "Dr Mohan Lal",
    "provider_usertype": "therapist",
    "is_inhouse": false,
    "id": 104,
    "image": "https://randomuser.me/api/portraits/men/4.jpg",
    "clinic_details": {
      "id": 4,
      "name": "Thane Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["09:00", "09:15", "09:30"],
        "offline_slots": ["10:00", "10:15"],
        "both_slots": ["11:00", "11:15"],
        "online_booked_slots": ["09:30"],
        "offline_booked_slots": ["10:15"],
        "blocked_slots": [{"slot": "12:00", "reason": "Break"}]
      }
    ]
  },
  {
    "name": "Akshay Jain",
    "provider_usertype": "therapist",
    "is_inhouse": true,
    "id": 105,
    "image": "https://randomuser.me/api/portraits/men/5.jpg",
    "clinic_details": {
      "id": 5,
      "name": "Vasai Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["13:00", "13:15", "13:30"],
        "offline_slots": ["14:00", "14:15"],
        "both_slots": ["15:00", "15:15"],
        "online_booked_slots": ["13:15"],
        "offline_booked_slots": ["14:00"],
        "blocked_slots": [{"slot": "16:00", "reason": "Meeting"}]
      }
    ]
  }
];