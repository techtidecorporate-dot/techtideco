import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';

dotenv.config();

const services = [
  {
    id: "crm-system",
    title: "CRM (Customer Relationship Management)",
    shortDescription: "Manage customer relationships, sales pipelines, and communication efficiently with a centralized CRM system.",
    description: "TechTide Co.’s CRM solutions help businesses build stronger customer relationships by centralizing customer data, tracking interactions, and automating sales and support workflows.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80", // CRM dashboard
    features: [
      "Customer data management",
      "Sales pipeline tracking",
      "Lead and opportunity management",
      "Automated follow-ups",
      "Customer interaction history",
      "Analytics dashboards"
    ],
    slug: "crm-customer-relationship-management",
    seoTitle: "CRM Solutions for Business Growth | TechTide Co.",
    seoDescription: "Streamline customer relationships and sales operations with TechTide Co.’s powerful CRM solutions.",
    seoKeywords: ["CRM system", "customer relationship management", "sales automation", "TechTide Co"]
  },

  {
    id: "cms-system",
    title: "CMS (Customer Management System)",
    shortDescription: "Centralize customer records and manage customer lifecycles with secure and scalable CMS solutions.",
    description: "TechTide Co.’s Customer Management Systems enable organizations to manage customer profiles, preferences, and engagement history from a single platform.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80", // customer data system
    features: [
      "Centralized customer database",
      "Customer segmentation",
      "Activity tracking",
      "Secure access controls",
      "System integrations",
      "Scalable architecture"
    ],
    slug: "customer-management-system",
    seoTitle: "Customer Management System (CMS) | TechTide Co.",
    seoDescription: "Manage and organize customer data efficiently with TechTide Co.’s secure CMS solutions.",
    seoKeywords: ["customer management system", "CMS platform", "customer data management", "TechTide Co"]
  },

  {
    id: "erp-portal",
    title: "ERP (Enterprise Resource Planning) Portal",
    shortDescription: "Integrate and manage core business operations through a unified ERP portal.",
    description: "TechTide Co.’s ERP portals streamline business processes by integrating finance, operations, inventory, and reporting into a single system.",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80", // enterprise systems
    features: [
      "Finance and accounting",
      "Inventory management",
      "Process automation",
      "Role-based access",
      "Real-time reporting",
      "Enterprise scalability"
    ],
    slug: "erp-portal-system",
    seoTitle: "ERP Portal Solutions for Enterprises | TechTide Co.",
    seoDescription: "Optimize business operations with TechTide Co.’s scalable ERP portal solutions.",
    seoKeywords: ["ERP system", "enterprise resource planning", "business automation", "TechTide Co"]
  },

  {
    id: "ecommerce-oms",
    title: "E-Commerce / OMS (Order Management System)",
    shortDescription: "Manage online sales, orders, inventory, and fulfillment with powerful e-commerce and OMS solutions.",
    description: "TechTide Co. delivers robust e-commerce platforms and OMS solutions to handle high-volume transactions and real-time inventory.",
    image: "https://www.freepik.com/free-photo/young-man-using-discount-coupon-his-smartphone-some-online-shopping-laptop_27999621.htm#fromView=search&page=1&position=23&uuid=fd3cde6d-e763-44f1-9ab2-9456d77a8c75&query=e+commerce", // ecommerce orders
    features: [
      "Product and inventory management",
      "Order processing",
      "Payment gateway integration",
      "Multi-channel sales",
      "Returns management",
      "Sales analytics"
    ],
    slug: "ecommerce-order-management-system",
    seoTitle: "E-Commerce & Order Management Solutions | TechTide Co.",
    seoDescription: "Scale your online business with TechTide Co.’s e-commerce and order management solutions.",
    seoKeywords: ["e-commerce system", "order management system", "online sales platform", "TechTide Co"]
  },

  {
    id: "hrms-system",
    title: "HRMS (Human Resource Management System)",
    shortDescription: "Streamline HR operations, employee management, and payroll with a modern HRMS.",
    description: "TechTide Co.’s HRMS solutions simplify workforce management from recruitment to performance evaluation.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80", // HR teamwork
    features: [
      "Employee records",
      "Attendance and leave tracking",
      "Payroll management",
      "Performance reviews",
      "Recruitment workflows",
      "HR analytics"
    ],
    slug: "human-resource-management-system",
    seoTitle: "HRMS Solutions for Workforce Management | TechTide Co.",
    seoDescription: "Optimize HR processes with TechTide Co.’s scalable HRMS solutions.",
    seoKeywords: ["HRMS system", "human resource management", "payroll system", "TechTide Co"]
  },

  {
    id: "analytics-reporting",
    title: "Analytics & Reporting System",
    shortDescription: "Transform business data into actionable insights with advanced analytics and reporting tools.",
    description: "TechTide Co.’s analytics systems deliver real-time dashboards and data-driven insights for smarter decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // analytics dashboards
    features: [
      "Real-time dashboards",
      "Custom reports",
      "Data visualization",
      "Performance tracking",
      "Business intelligence",
      "Export & sharing"
    ],
    slug: "analytics-reporting-system",
    seoTitle: "Business Analytics & Reporting Solutions | TechTide Co.",
    seoDescription: "Gain actionable insights with TechTide Co.’s analytics and reporting solutions.",
    seoKeywords: ["business analytics", "reporting system", "data visualization", "TechTide Co"]
  },

  {
    id: "billing-invoice",
    title: "Billing & Invoice System",
    shortDescription: "Automate billing, invoicing, and payment tracking with secure financial systems.",
    description: "TechTide Co.’s billing systems automate invoices, payments, and financial reporting securely.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80", // invoices & finance
    features: [
      "Automated invoices",
      "Recurring billing",
      "Payment tracking",
      "Tax management",
      "Multi-currency support",
      "Financial reports"
    ],
    slug: "billing-invoice-system",
    seoTitle: "Billing & Invoicing Software Solutions | TechTide Co.",
    seoDescription: "Automate billing and invoicing with TechTide Co.’s secure financial systems.",
    seoKeywords: ["billing system", "invoice software", "payment management", "TechTide Co"]
  },

  {
    id: "user-management-security",
    title: "User Management & Security System",
    shortDescription: "Control access, manage users, and protect systems with enterprise-grade security solutions.",
    description: "TechTide Co.’s user management systems ensure secure authentication, authorization, and access control.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80", // cybersecurity
    features: [
      "Role-based access",
      "Multi-factor authentication",
      "Permission management",
      "User activity logs",
      "Secure login",
      "Audit trails"
    ],
    slug: "user-management-security-system",
    seoTitle: "User Management & Security Solutions | TechTide Co.",
    seoDescription: "Protect applications with TechTide Co.’s secure user management systems.",
    seoKeywords: ["user management system", "application security", "access control", "TechTide Co"]
  },

  {
    id: "support-ticketing",
    title: "Support, Ticketing, Booking & Communication System",
    shortDescription: "Manage support tickets, bookings, chat, and messaging from a unified platform.",
    description: "TechTide Co.’s integrated support systems improve customer experience through centralized communication.",
    image: "https://images.unsplash.com/photo-1587614382346-ac8c1b20b6d8?auto=format&fit=crop&w=1200&q=80", // customer support center
    features: [
      "Ticket management",
      "Booking & scheduling",
      "Live chat",
      "Automated responses",
      "Customer feedback",
      "Agent analytics"
    ],
    slug: "support-ticketing-booking-chat-system",
    seoTitle: "Customer Support & Ticketing Systems | TechTide Co.",
    seoDescription: "Deliver exceptional customer support with TechTide Co.’s communication systems.",
    seoKeywords: ["support ticketing system", "customer support software", "live chat system", "TechTide Co"]
  },

  {
    id: "api-integration",
    title: "API & Integration System",
    shortDescription: "Connect applications and automate workflows with secure and scalable API integrations.",
    description: "TechTide Co.’s API solutions enable seamless communication between internal systems and third-party services.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80", // APIs & integrations
    features: [
      "REST & GraphQL APIs",
      "Third-party integrations",
      "Secure authentication",
      "Data synchronization",
      "Webhooks",
      "Scalable architecture"
    ],
    slug: "api-integration-system",
    seoTitle: "API & System Integration Solutions | TechTide Co.",
    seoDescription: "Enable seamless system integration with TechTide Co.’s secure API solutions.",
    seoKeywords: ["API integration", "system integration", "data synchronization", "TechTide Co"]
  }
];


const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding services');

    await Service.deleteMany({});
    console.log('Old services deleted');

    const formattedServices = services.map(s => {
      const { id, ...rest } = s;
      return rest;
    });

    await Service.insertMany(formattedServices);
    console.log(`${services.length} services seeded successfully`);

    process.exit();
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
