/**
 * Generated data for TFN Academy's public website.
 * Source of truth: the approved content prototype. Edit here, not inline in pages.
 * Placeholder values (fee, bank, seats, WhatsApp link, demo codes) are marked PLACEHOLDER.
 */
import type {
  Programme, ProgrammeCategoryInfo, KidsProgramme, StudentStory, TalentProfile,
  VerifyRecord, BlogPost, HubSpace, HubPriceTable, HubPlanInfo, HubAmenity,
  CareerRole, Scholarship, BankDetails, PromoCode, VideoTeaser, CorpItem, StepTuple,
  OpenDecision, FaqItem,
} from '@/shared/types/academy';

export const PROGRAMMES: Programme[] = [
  {
    "certs": [
      "Meta Front-End Developer Professional Certificate",
      "freeCodeCamp Responsive Web Design Certification",
      "freeCodeCamp JavaScript Algorithms and Data Structures Certification"
    ],
    "fq": {
      "Need to know": "HTML, CSS and JavaScript deeply; React as the core framework; Tailwind CSS and Bootstrap 5 for rapid styling; responsive design, accessibility, performance and deployment.",
      "Able to do": "Turn any design into a fast, responsive, accessible web interface; build React applications with state, routing and API data; deploy and maintain them on modern hosting.",
      "Real-world problem": "A business with no web presence — or a slow, dated, mobile-unfriendly one — gets a modern, fast, conversion-focused website or web app built and deployed by the student.",
      "Proof project": "A multi-page responsive business website (Beginner) and a full React single-page application with routing, state management and API integration, deployed with CI (Advanced).",
      "Career translation": "Employment: frontend developer — the most abundant entry role in tech. Entrepreneurship: freelance websites and web apps for businesses. Further learning: backend track (full-stack), UI/UX design, advanced React/Next.js."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic HTML/CSS knowledge recommended but not mandatory. We cover the fundamentals.",
        "expect": "Master modern frontend development from the ground up. Build responsive, interactive websites and single-page applications using React, Tailwind CSS, Bootstrap 5, and modern JavaScript. Deploy your portfolio to the web.",
        "mods": [
          {
            "n": "Web Fundamentals & JavaScript Essentials",
            "t": "HTML5 semantic elements, CSS3, Flexbox, Grid, responsive design, ES6+ syntax, DOM manipulation, events, fetch API, async/await"
          },
          {
            "n": "Modern CSS with Tailwind & Bootstrap",
            "t": "Utility-first CSS with Tailwind (configuration, custom themes, responsive modifiers, dark mode), Bootstrap 5 grid system & components, when to choose each framework, component extraction"
          },
          {
            "n": "React Fundamentals & Routing",
            "t": "JSX, components, props, state, useEffect, useState, conditional rendering, React Router, nested routes, lazy loading"
          },
          {
            "n": "State Management, Hooks & API Integration",
            "t": "useContext, useReducer, custom hooks, REST API consumption, axios, error handling, loading states, pagination"
          },
          {
            "n": "Git, Build Tools & Deployment",
            "t": "Git and GitHub workflows, Vite, bundling, environment variables, Vercel and Netlify deployment"
          },
          {
            "n": "Capstone: E-Commerce Frontend",
            "t": "Build a full e-commerce frontend with a cart, checkout flow and user authentication, deployed to Vercel"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Responsive landing page with Tailwind, rebuilt in Bootstrap 5 with a comparison write-up."
          },
          {
            "k": "Project 2",
            "t": "Interactive JavaScript calculator and to-do list."
          },
          {
            "k": "Project 3",
            "t": "Movie/Recipe search app with external API."
          },
          {
            "k": "Capstone",
            "t": "Full E-Commerce frontend with cart, checkout flow, user auth, and deployed to Vercel."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Frontend OR solid React + JavaScript experience (6+ months) OR built 2+ production-like React apps.",
        "expect": "Build enterprise-grade frontend applications with advanced state management, performance optimization, testing, and modern architecture patterns. Prepare for senior frontend and full-stack roles.",
        "mods": [
          {
            "n": "Advanced React, TypeScript & Patterns",
            "t": "Compound components, React.memo, useMemo, useCallback, code splitting, TypeScript fundamentals, interfaces, generics, prop typing"
          },
          {
            "n": "Advanced State Management & Backend Integration",
            "t": "Redux Toolkit (RTK), Zustand, React Query (TanStack Query), GraphQL with Apollo Client, WebSockets, real-time updates, JWT, OAuth"
          },
          {
            "n": "Testing, Performance & Accessibility",
            "t": "Jest, React Testing Library, integration testing, Cypress/Playwright, Lighthouse optimization, Core Web Vitals, ARIA, keyboard navigation"
          },
          {
            "n": "Micro-Frontends & Design Systems",
            "t": "Micro-frontend architecture, Module Federation, Storybook, design tokens, headless UI"
          },
          {
            "n": "Capstone: SaaS Application",
            "t": "Build a full SaaS application with multi-tenancy, role-based UI, real-time notifications and strong automated test coverage"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Real-time collaborative whiteboard with WebSockets."
          },
          {
            "k": "Project 2",
            "t": "SaaS analytics dashboard with React Query, TypeScript, and charts."
          },
          {
            "k": "Capstone",
            "t": "Full SaaS application with multi-tenancy, role-based UI, real-time notifications, 90%+ test coverage, and performance budget compliance."
          }
        ]
      }
    ],
    "slug": "frontend",
    "name": "Frontend Development",
    "short": "Frontend Development",
    "ic": "layout-template",
    "cat": "software",
    "line": "Build the websites and web apps people actually click.",
    "tags": [
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    "tools": "Node.js LTS, VS Code with Tailwind and React extensions, Chrome DevTools, and Vercel, Netlify and Figma accounts."
  },
  {
    "certs": [
      "Python Institute PCAP",
      "Python Institute PCPP",
      "AWS Certified Developer – Associate",
      "Meta Back-End Developer Professional Certificate"
    ],
    "fq": {
      "Need to know": "Python programming, Django and FastAPI as the core stack, Laravel (PHP) for expanded knowledge, databases (PostgreSQL), REST API design, authentication, caching, testing and deployment.",
      "Able to do": "Design, build, secure and deploy production APIs and server-side systems: data models, auth, payments, background jobs, documentation — and read a Laravel codebase confidently.",
      "Real-world problem": "Any organisation whose records, orders or payments live in notebooks and WhatsApp — the student builds the system that runs the business properly.",
      "Proof project": "A complete REST API with authentication and PostgreSQL (Beginner) and a production-grade, tested, Dockerised multi-service backend with payments and CI/CD (Advanced), plus a Laravel rebuild of one module.",
      "Career translation": "Employment: backend developer (Python/PHP remain among the most-hired skills). Entrepreneurship: build systems for SMEs, SaaS products. Further learning: cloud/DevOps track, system design, senior engineering paths."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic programming concepts (variables, loops, functions). No prior Python experience required — Python is taught from the ground up.",
        "expect": "Learn to build robust server-side applications with Python as the core language — Django and Django REST Framework for full-featured applications, and FastAPI for modern high-performance APIs. Understand databases, REST APIs, authentication, and deployment. Laravel (PHP) is introduced for expanded knowledge and freelance-market range. By the end, you will build and deploy a complete backend API.",
        "mods": [
          {
            "n": "Backend Fundamentals & HTTP",
            "t": "Client-server architecture, HTTP methods, status codes, REST principles, API design basics, Postman"
          },
          {
            "n": "Python Programming Essentials",
            "t": "Python syntax, data structures, functions, OOP, virtual environments, pip, error handling, file I/O"
          },
          {
            "n": "Django Fundamentals",
            "t": "Django project structure, models, views, templates, admin panel, Django ORM, migrations"
          },
          {
            "n": "Databases, SQL & Django REST Framework",
            "t": "Relational databases, PostgreSQL, CRUD, joins, indexes, normalization, DRF serializers, viewsets, routers"
          },
          {
            "n": "FastAPI, Authentication & Security",
            "t": "FastAPI basics, Pydantic models, JWT authentication, bcrypt hashing, CORS, input validation, Swagger documentation"
          },
          {
            "n": "Laravel Foundations (Expanded Knowledge)",
            "t": "PHP and Composer basics, Laravel project structure, Blade, Eloquent ORM, Artisan"
          },
          {
            "n": "Deployment & Git Workflows",
            "t": "Environment variables, deploying to Render and Railway, Git workflows, API documentation"
          },
          {
            "n": "Capstone: Blog API or E-Commerce Backend",
            "t": "Build a complete Blog API or E-Commerce backend with Django REST Framework or FastAPI, authentication and a database, deployed to the cloud"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Django blog with admin panel and PostgreSQL."
          },
          {
            "k": "Project 2",
            "t": "Task manager REST API in FastAPI with JWT authentication."
          },
          {
            "k": "Project 3",
            "t": "Laravel rebuild of the blog with Blade and Eloquent (expanded knowledge)."
          },
          {
            "k": "Capstone",
            "t": "Full-featured API for a social platform with user profiles, posts, comments, likes, JWT authentication, and deployed to cloud with documentation."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Backend OR 6+ months building APIs with Python (Django/FastAPI) or a comparable framework.",
        "expect": "Master high-performance Python backend architecture — advanced Django and FastAPI, microservices, real-time systems, advanced databases, and cloud-native development. Laravel is practiced at a working level (queues, events, Sanctum) for expanded knowledge. Build systems that handle scale, security, and complexity.",
        "mods": [
          {
            "n": "Advanced Django, FastAPI & Async Python",
            "t": "DRF advanced (permissions, throttling, filtering), Django signals & middleware, async views, FastAPI dependency injection, background tasks, Pydantic v2, asyncio"
          },
          {
            "n": "Advanced Databases, Caching & Microservices",
            "t": "Query optimization, connection pooling, Redis caching, CQRS, service boundaries, message brokers (RabbitMQ, Kafka), API Gateway"
          },
          {
            "n": "Real-Time Systems, Security & Testing",
            "t": "Django Channels, WebSockets, OAuth2/OIDC, RBAC/ABAC, OWASP Top 10, pytest, factory_boy, integration testing, load testing (k6)"
          },
          {
            "n": "Laravel in Practice (Expanded Knowledge)",
            "t": "Queues, events, broadcasting, Sanctum"
          },
          {
            "n": "Containers & Cloud-Native Deployment",
            "t": "Docker for Python services, Kubernetes deployments, health checks, logging, monitoring"
          },
          {
            "n": "Capstone: Scalable Fintech Backend",
            "t": "Build a fintech backend with transaction processing, a multi-service architecture and Kubernetes deployment"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Real-time trading/auction platform with Django Channels/WebSockets and Redis pub/sub."
          },
          {
            "k": "Project 2",
            "t": "Microservices e-commerce backend with Kafka and Docker."
          },
          {
            "k": "Capstone",
            "t": "Scalable fintech backend with transaction processing, fraud detection hooks, multi-service architecture, comprehensive testing, and Kubernetes deployment."
          }
        ]
      }
    ],
    "slug": "backend",
    "name": "Backend Development",
    "short": "Backend Development",
    "ic": "server",
    "cat": "software",
    "line": "Build the APIs and databases behind every app.",
    "tags": [
      "Python",
      "Django",
      "FastAPI"
    ],
    "tools": "Python 3.11+, PostgreSQL, Docker, Postman, PHP 8.2, Composer and the Laravel installer. Render or Railway free tier."
  },
  {
    "name": "Full-Stack Web Development",
    "short": "Full-Stack Web Development",
    "ic": "blocks",
    "cat": "software",
    "line": "Build and launch complete web products, from interface to database.",
    "tags": [
      "React & Next.js",
      "Node.js",
      "PostgreSQL"
    ],
    "tools": "Node.js LTS, VS Code, Git and GitHub, Postman, PostgreSQL, Docker Desktop, and Vercel, Render or Railway accounts. 8GB RAM minimum (16GB recommended).",
    "certs": [
      "Meta Front-End Developer Professional Certificate",
      "Meta Back-End Developer Professional Certificate",
      "AWS Certified Developer – Associate",
      "OpenJS Node.js Application Developer (JSNAD)"
    ],
    "fq": {
      "Need to know": "How the whole web stack fits together: HTML, CSS, JavaScript and TypeScript, React and Next.js, Node.js APIs, databases (PostgreSQL and MongoDB), authentication, Git, deployment and basic DevOps.",
      "Able to do": "Design, build and deploy complete web applications end to end: user interface, API, database, authentication, payments and hosting, and work smoothly with both frontend and backend teams.",
      "Real-world problem": "A small business or startup that needs a working web product but cannot afford separate frontend and backend teams. The student builds and launches the whole thing.",
      "Proof project": "A complete e-commerce or booking application with user accounts, an admin dashboard and live deployment (Beginner), and a scalable SaaS product with payments, real-time features, testing and CI/CD (Advanced).",
      "Career translation": "Employment: full-stack developer, web developer, software engineer. Entrepreneurship: build websites and web apps for clients, or launch your own SaaS product. Further learning: Cloud & DevOps, Mobile Development and system design."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic computer skills and logical thinking. No programming experience required; we start from the fundamentals.",
        "expect": "Learn to build complete web applications from the ground up using JavaScript, React, Node.js and a database, and deploy them live.",
        "mods": [
          {
            "n": "Web Foundations: HTML, CSS & Responsive Design",
            "t": "Semantic HTML, CSS3, Flexbox, Grid, responsive layouts, accessibility basics, Tailwind CSS, browser DevTools"
          },
          {
            "n": "JavaScript & TypeScript Essentials",
            "t": "Variables, functions, arrays and objects, ES6+, DOM manipulation, async/await, fetch, modules, TypeScript basics"
          },
          {
            "n": "Git, GitHub & Developer Workflow",
            "t": "Version control, branching and pull requests, command line, npm, debugging, code reviews, project structure"
          },
          {
            "n": "React & Next.js Frontend",
            "t": "Components, props and state, hooks, forms and validation, routing, data fetching, Next.js pages and layouts, server and client components"
          },
          {
            "n": "Node.js, Express & REST APIs",
            "t": "Node.js runtime, Express routing and middleware, REST API design, request validation, error handling, API testing with Postman"
          },
          {
            "n": "Databases & Authentication",
            "t": "PostgreSQL and SQL basics, MongoDB basics, ORMs (Prisma), data modelling, password hashing, JWT and session authentication, role-based access"
          },
          {
            "n": "Deployment & Web Security Basics",
            "t": "Environment variables, deploying to Vercel and Render or Railway, domains and HTTPS, CORS, input sanitisation, common web vulnerabilities, logging"
          },
          {
            "n": "Capstone: Full-Stack Web Application",
            "t": "Design, build and deploy a complete web application with user accounts, a database, an API and a polished interface"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Responsive portfolio website built with Tailwind CSS."
          },
          {
            "k": "Project 2",
            "t": "Interactive JavaScript app, such as a budget tracker, with local storage."
          },
          {
            "k": "Project 3",
            "t": "REST API with Express and PostgreSQL, tested in Postman."
          },
          {
            "k": "Capstone",
            "t": "E-commerce or booking application with authentication, an admin dashboard and live deployment."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Full-Stack Web Development OR solid JavaScript and React experience plus at least one API built with Node.js.",
        "expect": "Build production-grade, scalable web products with advanced TypeScript, testing, real-time features, payments, performance work and CI/CD.",
        "mods": [
          {
            "n": "Advanced TypeScript & Application Architecture",
            "t": "Generics, utility types, project architecture, clean code, design patterns, monorepos, API contracts, error-handling strategies"
          },
          {
            "n": "Advanced Frontend: State, Performance & Accessibility",
            "t": "TanStack Query, Zustand and Redux Toolkit, server-side rendering and caching, performance optimisation, Core Web Vitals, accessibility, internationalisation"
          },
          {
            "n": "Backend Depth: NestJS, GraphQL & Real-Time",
            "t": "NestJS structure, dependency injection, GraphQL, WebSockets, background jobs and queues, file uploads, email and notifications, rate limiting"
          },
          {
            "n": "Payments, Integrations & Security",
            "t": "Payment gateways (Paystack, Flutterwave), webhooks, third-party APIs, OAuth and social login, OWASP Top 10, secrets management, data protection"
          },
          {
            "n": "Testing, CI/CD & Cloud Deployment",
            "t": "Unit, integration and end-to-end tests, GitHub Actions pipelines, Docker, cloud hosting, monitoring and logging, zero-downtime releases"
          },
          {
            "n": "Capstone: SaaS Product",
            "t": "Design and launch a multi-user SaaS product with subscriptions, real-time features, automated tests and a CI/CD pipeline"
          },
          {
            "n": "Career Prep: Portfolio, Interviews & Freelancing",
            "t": "Portfolio polish, technical interviews, system design basics, open-source contributions, pricing and winning freelance clients"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Real-time chat or notification system with WebSockets."
          },
          {
            "k": "Project 2",
            "t": "Payment-enabled checkout using Paystack or Flutterwave, with webhooks."
          },
          {
            "k": "Project 3",
            "t": "CI/CD pipeline with automated tests and Docker deployment."
          },
          {
            "k": "Capstone",
            "t": "Multi-tenant SaaS application with subscriptions, admin analytics and live deployment."
          }
        ]
      }
    ],
    "slug": "fullstack"
  },
  {
    "certs": [
      "Meta React Native Specialization (Coursera)",
      "Google UX Design Certificate",
      "AWS Certified Developer – Associate"
    ],
    "fq": {
      "Need to know": "Dart and Flutter, JavaScript/TypeScript and React Native (Expo), mobile UI patterns, state management, API integration, local storage, testing, and store publishing.",
      "Able to do": "Design, build, test and publish cross-platform mobile apps in both major frameworks — consuming APIs, storing data locally, handling authentication and real-time sync, and shipping to the Play Store.",
      "Real-world problem": "A business, church, school or startup that needs its service in customers’ pockets — the student delivers a working, published mobile app on both major frameworks.",
      "Proof project": "A published Task Manager or E-Commerce app (Beginner) and a production-grade Fintech/HealthTech app with backend, real-time sync, 80%+ test coverage and CI/CD (Advanced) — in Flutter or React Native.",
      "Career translation": "Employment: mobile developer (Flutter/React Native are the two most-demanded cross-platform skills). Entrepreneurship: build apps for clients or launch your own product. Further learning: Associate Android Developer, Meta React Native Specialization, backend tracks."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic programming logic understanding. No mobile development experience required. JavaScript knowledge is NOT required — it is taught inside the course.",
        "expect": "Learn Dart + Flutter and JavaScript + React Native — the two most in-demand cross-platform stacks. Build beautiful apps for iOS and Android in both frameworks, and by the end publish a functional app to the Google Play Store.",
        "mods": [
          {
            "n": "Dart Programming Fundamentals",
            "t": "Variables, data types, control flow, functions, OOP in Dart, collections, null safety, async/await"
          },
          {
            "n": "Flutter Widgets, Layouts & Navigation",
            "t": "Flutter architecture, stateless vs stateful widgets, Material Design, Row, Column, Stack, ListView, GridView, navigation, multi-screen apps"
          },
          {
            "n": "State Management, APIs & Local Storage",
            "t": "setState, Provider, HTTP requests, JSON parsing, error handling, loading states, TextField, Form widget, validation, SharedPreferences, SQLite (sqflite)"
          },
          {
            "n": "React Native Essentials with Expo",
            "t": "JavaScript and TypeScript essentials for Dart developers, Expo setup and Expo Go, core components (View, Text, Image, StyleSheet), React Navigation, fetching API data, Flutter vs React Native — strengths and when to choose which"
          },
          {
            "n": "App Publishing & Release",
            "t": "App signing, Play Store Console, app icons, splash screens, release builds, store listing and review requirements"
          },
          {
            "n": "Capstone: Task Manager or E-Commerce App",
            "t": "Build a Task Manager or E-Commerce app in Flutter or React Native with full features, then publish it"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Personal Portfolio App with multiple screens."
          },
          {
            "k": "Project 2",
            "t": "Weather App consuming OpenWeatherMap API (built in Flutter, then rebuilt in React Native)."
          },
          {
            "k": "Project 3",
            "t": "Note-taking app with local SQLite storage."
          },
          {
            "k": "Capstone",
            "t": "Full-featured Task Management or Food Delivery App in Flutter or React Native with API integration, local storage, and published to Play Store."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of the TFN Beginner Mobile Development level OR at least 1 published app OR 6+ months Flutter/React Native experience.",
        "expect": "Master advanced state management, backend integration, real-time features, and native platform bridges — in both Flutter and React Native. Build production-ready apps with clean architecture, automated testing, and CI/CD for mobile, and learn to choose the right framework for each project.",
        "mods": [
          {
            "n": "Advanced Dart, Design Patterns & Clean Architecture",
            "t": "Generics, extensions, mixins, SOLID principles, repository pattern, dependency injection (GetIt), layered design"
          },
          {
            "n": "Advanced State Management & Firebase",
            "t": "BLoC pattern (flutter_bloc), Riverpod, Firebase (Auth, Firestore, Cloud Functions), push notifications (FCM)"
          },
          {
            "n": "React Native Advanced & Native Integration",
            "t": "React Navigation in depth, Expo modules & EAS, native device APIs in React Native (camera, geolocation, biometrics), platform channels in Flutter, GraphQL & WebSockets, cross-framework architecture decisions"
          },
          {
            "n": "Testing, Performance & CI/CD for Mobile",
            "t": "Unit & widget testing, Jest for React Native, Flutter DevTools & React DevTools, Codemagic, GitHub Actions, EAS Build & Submit, beta distribution"
          },
          {
            "n": "Capstone: Production-Grade Mobile App",
            "t": "Build a production-grade fintech or health-tech app in Flutter or React Native with a full backend, real-time sync, comprehensive testing, CI/CD and store submission"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Chat app with Firebase real-time database and push notifications."
          },
          {
            "k": "Project 2",
            "t": "Fintech app with biometric auth and GraphQL backend (features built across Flutter and React Native)."
          },
          {
            "k": "Capstone",
            "t": "Full production-ready app in Flutter or React Native with clean architecture, 80%+ test coverage, CI/CD pipeline, and published to stores."
          }
        ]
      }
    ],
    "slug": "mobile",
    "name": "Mobile Development",
    "short": "Mobile Development",
    "ic": "smartphone",
    "cat": "software",
    "line": "Ship Android and iOS apps with Flutter and React Native.",
    "tags": [
      "Flutter",
      "React Native",
      "Dart"
    ],
    "tools": "Flutter SDK, Android Studio, VS Code, Node.js LTS and Expo (Expo Go on your phone). A physical Android phone is recommended, and a Play Console account ($25) when you publish."
  },
  {
    "certs": [
      "AWS Certified Cloud Practitioner",
      "AWS Solutions Architect Associate",
      "AWS DevOps Engineer Professional",
      "Kubernetes CKA/CKAD",
      "Terraform Associate"
    ],
    "fq": {
      "Need to know": "How cloud computing works (IaaS, PaaS, SaaS), core AWS services — compute, storage, networking, databases and IAM — plus containers, Infrastructure as Code, CI/CD, monitoring and cost control.",
      "Able to do": "Design, deploy, secure, automate and monitor real workloads on AWS: VPCs, EC2, RDS, S3, Docker, Kubernetes/EKS, Terraform and GitOps pipelines — with costs and security under control.",
      "Real-world problem": "A business whose website crashes under traffic, loses data, or burns money on servers — the student migrates it to a scalable, monitored, cost-efficient cloud architecture.",
      "Proof project": "A scalable, auto-healing WordPress deployment on AWS (Beginner) and an end-to-end DevOps pipeline for a fintech-style microservices app with security scanning and disaster recovery (Advanced).",
      "Career translation": "Employment: cloud support engineer, DevOps associate, solutions architect path. Entrepreneurship: cloud migration and management services for SMEs. Further learning: AWS Solutions Architect Associate → Professional, CKA, Terraform Associate."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic computer literacy. No prior IT experience required.",
        "expect": "Build foundational cloud knowledge using AWS. Deploy virtual servers, manage storage, and understand networking basics. By the end, you will deploy a static website on AWS and understand core cloud concepts.",
        "mods": [
          {
            "n": "Linux & Command-Line Essentials",
            "t": "Linux file system, users and permissions, package managers, SSH, shell basics, simple Bash scripts, working confidently in the terminal"
          },
          {
            "n": "Introduction to Cloud Computing",
            "t": "Cloud models (IaaS, PaaS, SaaS), AWS global infrastructure, shared responsibility model, setting up AWS Free Tier account"
          },
          {
            "n": "AWS Core Services: Compute & Storage",
            "t": "EC2 instances, AMIs, instance types, SSH/Session Manager, S3 buckets, object storage, EBS volumes, storage classes"
          },
          {
            "n": "AWS Core Services: Networking",
            "t": "VPC, subnets, route tables, internet gateways, security groups, NACLs, Elastic IPs"
          },
          {
            "n": "AWS Core Services: Databases & IAM",
            "t": "RDS (MySQL/PostgreSQL), DynamoDB basics, IAM users, groups, roles, policies, MFA, best practices"
          },
          {
            "n": "Monitoring, Billing & IaC Basics",
            "t": "CloudWatch, CloudTrail, AWS Budgets, Cost Explorer, CloudFormation basics, YAML templates"
          },
          {
            "n": "Introduction to DevOps",
            "t": "DevOps culture, CI/CD concepts, version control with Git, GitHub basics, branching strategies"
          },
          {
            "n": "Docker Fundamentals",
            "t": "Containerization concepts, Dockerfile, Docker Compose, container registries (ECR), running containers on EC2"
          },
          {
            "n": "Capstone: Scalable Web Application on AWS",
            "t": "Deploy a multi-tier web application on AWS using EC2, RDS, S3 and VPC, with load balancing, monitoring and a short architecture write-up"
          },
          {
            "n": "Certification Prep: AWS Cloud Practitioner",
            "t": "Exam domains review, mock tests, cost and security scenarios, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Deploy a static resume website on S3 with CloudFront."
          },
          {
            "k": "Project 2",
            "t": "Create a 3-tier VPC and launch a LAMP stack."
          },
          {
            "k": "Project 3",
            "t": "Set up automated billing alerts and IAM for a mock startup team."
          },
          {
            "k": "Capstone",
            "t": "Deploy a scalable WordPress blog with auto-scaling and RDS."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Cloud & DevOps OR AWS Cloud Practitioner certification OR equivalent hands-on AWS experience (6+ months).",
        "expect": "Master containerization, orchestration, CI/CD pipelines, and infrastructure automation. You will architect production-grade systems, implement GitOps workflows, and prepare for professional DevOps and Solutions Architect roles.",
        "mods": [
          {
            "n": "Advanced AWS Architecture",
            "t": "Multi-region architectures, disaster recovery, AWS Well-Architected Framework, cost optimization, advanced VPC design"
          },
          {
            "n": "Kubernetes (EKS)",
            "t": "K8s architecture, pods, deployments, services, ingress, configmaps, secrets, Helm charts, EKS cluster management"
          },
          {
            "n": "Infrastructure as Code: Terraform",
            "t": "HCL syntax, state management, modules, remote backends, workspaces, Terraform Cloud, multi-provider setups"
          },
          {
            "n": "CI/CD Pipelines & GitOps",
            "t": "GitHub Actions, AWS CodePipeline, Jenkins, blue-green deployments, ArgoCD, Flux, GitOps principles"
          },
          {
            "n": "Monitoring, Security & Observability",
            "t": "Prometheus, Grafana, container scanning (Trivy), secrets management (Vault), DevSecOps practices"
          },
          {
            "n": "Capstone: Microservices on EKS",
            "t": "Design and deploy a microservices architecture on EKS with full CI/CD, monitoring and auto-scaling"
          },
          {
            "n": "Certification Prep: Solutions Architect Associate",
            "t": "Mock exams, hands-on labs, exam strategy and review"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Containerize a Node.js application and deploy to EKS with Helm."
          },
          {
            "k": "Project 2",
            "t": "Build a Terraform module library for reusable AWS infrastructure."
          },
          {
            "k": "Project 3",
            "t": "Create a GitOps pipeline with ArgoCD for automated deployments."
          },
          {
            "k": "Capstone",
            "t": "End-to-end DevOps pipeline for a fintech-like application with security scanning, multi-env deployment, and disaster recovery."
          }
        ]
      }
    ],
    "slug": "cloud",
    "name": "Cloud & DevOps",
    "short": "Cloud & DevOps",
    "ic": "cloud",
    "cat": "infra",
    "line": "Run apps on AWS that stay up when everyone shows up.",
    "tags": [
      "AWS",
      "Docker",
      "Kubernetes"
    ],
    "tools": "AWS CLI, Docker Desktop, Terraform, kubectl, Helm and an AWS Free Tier account (card for verification only)."
  },
  {
    "certs": [
      "CompTIA Security+",
      "CompTIA CySA+",
      "Certified Ethical Hacker (CEH)",
      "(ISC)² SSCP",
      "AWS Certified Security – Specialty"
    ],
    "fq": {
      "Need to know": "Security fundamentals (CIA triad, threats, vulnerabilities), networking for security, operating systems, cryptography basics, attacker techniques, defensive operations, governance and Nigerian/international cyber law.",
      "Able to do": "Harden systems and networks, analyse threats and logs, run authorised vulnerability assessments and penetration tests, respond to incidents, and write professional security reports.",
      "Real-world problem": "A business losing money or trust to fraud, breaches and weak security — the student finds the holes before criminals do, fixes them, and builds a security culture.",
      "Proof project": "A full vulnerability assessment and hardening of a small-business environment (Beginner) and an authorised end-to-end penetration test with a professional report and remediation plan (Advanced).",
      "Career translation": "Employment: SOC analyst, security analyst, junior penetration tester. Entrepreneurship: security audits and awareness training for SMEs. Further learning: Security+, CySA+, CEH, then OSCP and specialisations."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic IT knowledge (operating systems, networks). No security experience required. A curious mindset and ethical standards are essential.",
        "expect": "Build a solid foundation in cybersecurity principles, network security, and threat awareness. Learn to identify vulnerabilities, secure systems, and understand attacker methodologies. Prepare for entry-level SOC analyst or security technician roles.",
        "mods": [
          {
            "n": "Cybersecurity Fundamentals & Networking",
            "t": "CIA triad, security governance, risk management, compliance (GDPR, NDPR) and the Nigerian Cybercrimes Act, TCP/IP, OSI model, subnetting, DNS, firewalls, IDS/IPS, Wireshark"
          },
          {
            "n": "Operating System Security & Threats",
            "t": "Windows security (AD, Group Policy), Linux hardening, patch management, malware types, social engineering, phishing, DDoS, OWASP Top 10 basics"
          },
          {
            "n": "Identity, Access Management & Cryptography",
            "t": "Authentication methods, MFA, RBAC, SSO concepts, symmetric/asymmetric encryption, hashing, PKI, SSL/TLS, certificate management"
          },
          {
            "n": "Security Operations & Assessment",
            "t": "SOC operations, SIEM basics (Splunk, Wazuh), log analysis, incident response lifecycle, vulnerability assessment, penetration testing lifecycle, CTF exercises"
          },
          {
            "n": "Capstone: Security Assessment",
            "t": "Hands-on labs, network security audit, Linux hardening, phishing simulation and a vulnerability assessment report"
          },
          {
            "n": "Certification Prep: CompTIA Security+",
            "t": "Exam domains review, mock tests, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Network security audit of a mock corporate network using Wireshark and Nmap."
          },
          {
            "k": "Project 2",
            "t": "Harden a Linux server against CIS benchmarks."
          },
          {
            "k": "Project 3",
            "t": "Phishing awareness campaign simulation."
          },
          {
            "k": "Capstone",
            "t": "Complete security assessment (network + web app + policy) with executive summary, technical findings, and remediation roadmap."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Cybersecurity OR CompTIA Security+ certified OR 6+ months in IT/security role.",
        "expect": "Master offensive security, advanced defense strategies, cloud security, and enterprise security architecture. Prepare for ethical hacking, advanced SOC analyst, and security engineering roles.",
        "mods": [
          {
            "n": "Advanced Penetration Testing & Network Security",
            "t": "Web app exploitation (SQLi, XSS, CSRF, RCE), privilege escalation, lateral movement, network segmentation, zero-trust architecture, threat hunting"
          },
          {
            "n": "Malware Analysis, Cloud Security & SIEM",
            "t": "Static/dynamic analysis, sandboxing, YARA rules, AWS/Azure security architecture, container security, Splunk advanced queries, SOAR, threat intelligence"
          },
          {
            "n": "DevSecOps, Forensics & Governance",
            "t": "Secure SDLC, SAST/DAST, container scanning, secrets management, disk/memory forensics (Volatility), incident command, enterprise security architecture, GRC"
          },
          {
            "n": "Capstone: Red Team vs Blue Team",
            "t": "A full web application penetration test, a red team versus blue team exercise, and an enterprise security assessment with a board presentation"
          },
          {
            "n": "Certification Prep: CEH & SSCP",
            "t": "Exam domains review, mock tests, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Full web application penetration test with detailed exploitation and remediation report."
          },
          {
            "k": "Project 2",
            "t": "Design a zero-trust network architecture for a hybrid cloud enterprise."
          },
          {
            "k": "Capstone",
            "t": "End-to-end red team exercise with full kill chain, blue team detection analysis, and executive board presentation."
          }
        ]
      }
    ],
    "slug": "cyber",
    "name": "Cybersecurity",
    "short": "Cybersecurity",
    "ic": "shield-check",
    "cat": "infra",
    "line": "Find the weak spots before attackers do.",
    "tags": [
      "Ethical hacking",
      "SOC",
      "Cloud security"
    ],
    "tools": "VirtualBox or VMware, Kali Linux VM, Wireshark, Nmap and Burp Suite Community Edition. A signed Ethical Use Agreement is required."
  },
  {
    "certs": [
      "Cisco Certified Support Technician (CCST) Networking",
      "CompTIA Network+ (N10-009)",
      "Cisco CCNA 200-301"
    ],
    "fq": {
      "Need to know": "How networks work end-to-end: devices, cabling, the OSI/TCP-IP models, IP addressing and subnetting, switching and routing, wireless, network security, monitoring and troubleshooting.",
      "Able to do": "Design, build, secure and troubleshoot small-business networks: configure switches, routers and access points, produce addressing plans and documentation, and diagnose faults methodically.",
      "Real-world problem": "A school, office or SME with a slow, flat, insecure network and no documentation — the student designs and demonstrates a segmented, secure, fully documented replacement.",
      "Proof project": "A complete simulated network for a 3-building school or SME — VLANs, VLSM addressing, routing, secure wireless, ACLs and monitoring — built in Packet Tracer, documented and defended.",
      "Career translation": "Employment: network support technician, NOC analyst, IT infrastructure roles. Entrepreneurship: network installation and support services for schools, offices and cybercafés. Further learning: CompTIA Network+, CCST, then CCNA."
    },
    "levels": [
      {
        "kind": "Single course",
        "pre": "Basic computer literacy (installing software, using files and folders). No prior networking or programming experience required.",
        "expect": "Understand how networks really work — from the cable to the cloud. You will design, build, secure and troubleshoot small-business networks in hands-on simulations, master IP addressing and subnetting, and finish ready for entry-level networking roles and the CompTIA Network+ / CCST certifications.",
        "mods": [
          {
            "n": "Networking Foundations & Models",
            "t": "Network types (LAN, WAN, MAN), topologies, network devices (routers, switches, access points, firewalls, modems), OSI & TCP/IP models, encapsulation, cables & media (copper, fibre), Ethernet standards"
          },
          {
            "n": "IP Addressing, Subnetting & Network Services",
            "t": "IPv4 addressing, subnet masks, network/broadcast addresses, VLSM subnetting practice, IPv6 basics, private vs public addressing, NAT, DHCP, DNS, ARP, ICMP"
          },
          {
            "n": "Switching & Routing",
            "t": "Switch operation, MAC tables, VLANs, trunking (802.1Q), inter-VLAN routing, STP basics, port security, static routing, default routes, dynamic routing with OSPF, router-on-a-stick"
          },
          {
            "n": "Wireless & Network Security",
            "t": "Wireless standards (802.11 a/b/g/n/ac/ax), WPA2/WPA3, SOHO network setup, wireless channels & coverage, common attacks (spoofing, DoS, rogue APs), ACLs, firewall concepts, VPN basics, AAA & password policy, physical security"
          },
          {
            "n": "Monitoring, Troubleshooting & Modern Networks",
            "t": "Structured troubleshooting method, ping/traceroute/ipconfig toolkit, Wireshark packet capture & analysis, Syslog & SNMP basics, WAN/ISP technologies (fibre, LTE, VSAT), cloud networking concepts, SDN & virtualisation intro"
          },
          {
            "n": "Capstone: Network Design Project",
            "t": "Complete a network design project, apply documentation standards, and present and defend your design"
          },
          {
            "n": "Certification Prep & Career Pathways",
            "t": "CompTIA Network+ and CCST Networking exam preparation, timed mock exams, career pathways in networking"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Subnetting & VLSM workbook solving real allocation scenarios."
          },
          {
            "k": "Project 2",
            "t": "Multi-site routed network with VLANs built in Packet Tracer."
          },
          {
            "k": "Project 3",
            "t": "Network security policy with ACLs, wireless hardening and monitoring."
          },
          {
            "k": "Capstone",
            "t": "Complete network design and working simulation for a 3-building school or SME — addressing plan, VLANs, routing, wireless, security, monitoring and full documentation.  (see the Weekly Project Schedule)."
          }
        ]
      }
    ],
    "slug": "network",
    "name": "Network Engineering",
    "short": "Network Engineering",
    "ic": "network",
    "cat": "infra",
    "line": "Design, secure and fix real networks.",
    "tags": [
      "Routing",
      "Switching",
      "Network security"
    ],
    "tools": "Cisco Packet Tracer (free via Cisco Networking Academy), Wireshark, Draw.io and a Cisco NetAcad account. GNS3 is optional."
  },
  {
    "name": "IT Support",
    "short": "IT Support",
    "ic": "headset",
    "cat": "infra",
    "line": "Be the person every organisation relies on when technology breaks.",
    "tags": [
      "Hardware",
      "Troubleshooting",
      "Microsoft 365"
    ],
    "tools": "VirtualBox or VMware, Windows and Linux ISO images, Cisco Packet Tracer, Wireshark, a Microsoft 365 or Google Workspace trial account, and a free ticketing tool such as Freshdesk or osTicket.",
    "certs": [
      "CompTIA A+ (Core 1 and Core 2)",
      "Google IT Support Professional Certificate",
      "ITIL 4 Foundation",
      "Microsoft 365 Fundamentals (MS-900)"
    ],
    "fq": {
      "Need to know": "How computers, operating systems, peripherals and networks work; structured troubleshooting; user and device management; Microsoft 365 and Google Workspace administration; security hygiene; and help-desk practice with ITIL basics.",
      "Able to do": "Assemble and configure computers, install and troubleshoot software, fix common network and printer faults, manage users and permissions, support remote users, handle tickets professionally and document every fix.",
      "Real-world problem": "An office where computers keep failing, Wi-Fi is unreliable, passwords lock people out and nobody tracks issues. The student sets up a reliable, secure and documented IT environment.",
      "Proof project": "A fully documented small-office IT setup: workstations, user accounts, network, backups, a help-desk ticket process and a troubleshooting knowledge base.",
      "Career translation": "Employment: IT support specialist, help-desk technician, desktop support officer, systems support associate. Entrepreneurship: managed IT support for homes and small businesses, device setup and repair. Further learning: Network Engineering, Cloud & DevOps or Cybersecurity."
    },
    "levels": [
      {
        "kind": "Single course",
        "pre": "Basic computer literacy. No prior IT experience required.",
        "expect": "Become the person organisations rely on when technology breaks. You will assemble and troubleshoot computers, manage operating systems and users, support networks and cloud tools, and work a help desk professionally.",
        "mods": [
          {
            "n": "IT Fundamentals & Computer Hardware",
            "t": "Computer components, assembling and upgrading a PC, peripherals, mobile devices, power and UPS, safe handling, reading specifications, BIOS and UEFI"
          },
          {
            "n": "Operating Systems: Windows, Linux & macOS",
            "t": "Installation and imaging, file systems, user and group management, permissions, command-line basics, updates, drivers, system tools, virtual machines"
          },
          {
            "n": "Networking for Support Technicians",
            "t": "TCP/IP, IP addressing, DHCP and DNS, Wi-Fi setup and troubleshooting, routers and switches, cabling basics, VPNs, ping, ipconfig and traceroute"
          },
          {
            "n": "Troubleshooting Methodology & Common Faults",
            "t": "Structured troubleshooting, diagnosing boot, performance, software, printer and peripheral problems, malware removal, data recovery, backups, documenting fixes"
          },
          {
            "n": "Microsoft 365 & Google Workspace Administration",
            "t": "Creating and managing accounts, password resets, multi-factor authentication, email and calendar setup, shared drives and permissions, licensing, mobile device management basics, onboarding and offboarding"
          },
          {
            "n": "Security Basics & Cloud Essentials",
            "t": "Malware and phishing awareness, endpoint protection, encryption, backup strategies, cloud storage and SaaS basics, remote desktop tools, access control, data protection and privacy (NDPR)"
          },
          {
            "n": "Help Desk Practice, ITIL & Customer Service",
            "t": "Ticketing systems, incidents versus requests, prioritisation and SLAs, ITIL 4 basics, communication skills, handling difficult users, remote support, knowledge-base writing, escalation"
          },
          {
            "n": "Capstone: Small-Office IT Setup",
            "t": "Plan, build and document an IT environment with workstations, users, network, backups and a help-desk process, then present your handover"
          },
          {
            "n": "Certification Prep: CompTIA A+ & Google IT Support",
            "t": "Exam domains review, performance-based practice, mock tests, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Build, test and document a PC, with a hardware inventory and test log."
          },
          {
            "k": "Project 2",
            "t": "Design and configure a small network with Wi-Fi, DHCP and DNS in a simulator, and document it."
          },
          {
            "k": "Project 3",
            "t": "Set up a Microsoft 365 or Google Workspace tenant with users, groups, MFA and an onboarding checklist."
          },
          {
            "k": "Capstone",
            "t": "Complete small-office IT setup with a ticketing process and knowledge base."
          }
        ]
      }
    ],
    "slug": "itsupport"
  },
  {
    "certs": [
      "Google Data Analytics Certificate",
      "Microsoft Power BI Data Analyst (PL-300)",
      "Tableau Desktop Specialist",
      "AWS Certified Data Engineer – Associate",
      "Microsoft Azure Data Scientist Associate (DP-100)"
    ],
    "fq": {
      "Need to know": "Data fundamentals, Excel, SQL, Power BI and Tableau, Python for analysis (pandas), statistics that matter, data cleaning, visualisation and the basics of data engineering and storytelling.",
      "Able to do": "Take messy real-world data, clean it, analyse it, and turn it into dashboards, reports and recommendations a decision-maker actually uses.",
      "Real-world problem": "A business guessing instead of knowing — sales, customers, inventory, campaigns. The student replaces opinion with evidence: dashboards that answer “what is happening and why”.",
      "Proof project": "A sales-performance analysis with an interactive Power BI dashboard (Beginner) and an end-to-end analytics pipeline — SQL + Python + executive dashboard with data-driven recommendations (Advanced).",
      "Career translation": "Employment: data analyst, BI analyst — among the fastest-growing roles in Nigeria and globally. Entrepreneurship: analytics and dashboard services for SMEs. Further learning: data engineering, data science, PL-300 certification."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic math and Excel knowledge. No programming or statistics background required.",
        "expect": "Learn to clean, analyze, and visualize data to drive business decisions. Master Excel, SQL, Python, and BI tools. Build a portfolio of dashboards and analytical reports.",
        "mods": [
          {
            "n": "Data Analytics Fundamentals & Excel",
            "t": "Data lifecycle, analytical thinking, KPIs, advanced Excel formulas, pivot tables, VLOOKUP/XLOOKUP, Power Query basics"
          },
          {
            "n": "SQL for Data Analysis",
            "t": "SELECT, WHERE, JOINs, GROUP BY, HAVING, subqueries, window functions, CTEs, data cleaning with SQL"
          },
          {
            "n": "Python for Data Analysis & Statistics",
            "t": "Pandas, NumPy basics, data cleaning, handling missing data, descriptive statistics, probability, hypothesis testing, correlation, A/B testing"
          },
          {
            "n": "Data Visualization with Power BI & Tableau",
            "t": "Visualization best practices, Power BI (data import, modeling, DAX, dashboards), Tableau (worksheets, calculated fields, dashboards, stories)"
          },
          {
            "n": "Capstone: SME Analytics Project",
            "t": "End-to-end analytics project for a Nigerian SME: SQL database, Python analysis and an executive dashboard"
          },
          {
            "n": "Certification Prep: Google Data Analytics",
            "t": "Course review, practice assessments, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Sales performance dashboard in Excel with interactive slicers."
          },
          {
            "k": "Project 2",
            "t": "Customer segmentation analysis using SQL on a retail database."
          },
          {
            "k": "Project 3",
            "t": "E-Commerce data cleaning and analysis with Python Pandas."
          },
          {
            "k": "Capstone",
            "t": "Comprehensive business intelligence solution for a Nigerian SME dataset with SQL database, Python analysis, and executive dashboard in Power BI."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Data Analytics OR equivalent experience with SQL, Python Pandas, and at least one BI tool.",
        "expect": "Master advanced analytics, predictive modeling, big data technologies, and enterprise BI architecture. Build machine learning models, automate data pipelines, and design self-service analytics platforms.",
        "mods": [
          {
            "n": "Advanced SQL, Data Engineering & Python",
            "t": "Complex window functions, recursive CTEs, query optimization, Apache Airflow, web scraping, API ingestion, data quality frameworks"
          },
          {
            "n": "Predictive Analytics & Machine Learning",
            "t": "Multiple regression, logistic regression, time series (ARIMA, Prophet), clustering, decision trees, Scikit-learn pipeline, feature engineering, model evaluation"
          },
          {
            "n": "Advanced BI, Big Data & Cloud Analytics",
            "t": "Advanced DAX, Tableau Server/Cloud, Apache Spark (PySpark), cloud warehouses (Snowflake, BigQuery), dbt, data lake concepts"
          },
          {
            "n": "Capstone: Analytics Platform",
            "t": "Design an end-to-end analytics platform with an automated data pipeline, predictive models and executive dashboards"
          },
          {
            "n": "Certification Prep: PL-300 & Tableau Specialist",
            "t": "Exam domains review, practice tests, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Automated data pipeline with Airflow extracting from APIs, transforming, and loading to warehouse."
          },
          {
            "k": "Project 2",
            "t": "Customer churn prediction model with Python and deployed insights dashboard."
          },
          {
            "k": "Capstone",
            "t": "Full analytics platform for a retail/e-commerce company with data pipeline, predictive models, executive dashboards, and strategic recommendations."
          }
        ]
      }
    ],
    "slug": "data",
    "name": "Data Analytics & BI",
    "short": "Data Analytics",
    "ic": "bar-chart-3",
    "cat": "data",
    "line": "Turn messy data into decisions people act on.",
    "tags": [
      "SQL",
      "Power BI",
      "Python"
    ],
    "tools": "Excel, Power BI Desktop (Windows), Tableau Public, Python/Anaconda, PostgreSQL, and Kaggle and Google Colab accounts."
  },
  {
    "certs": [
      "Google AI Essentials",
      "Microsoft Certified: Azure AI Fundamentals (AI-900)",
      "AWS Certified AI Practitioner (AIF-C01)"
    ],
    "fq": {
      "Need to know": "What AI is (in plain language), the major AI assistants and tools, practical prompting, using AI for work, business, teaching, learning and home, simple no-code automation, and responsible/safe AI use.",
      "Able to do": "Use AI confidently for documents, planning, marketing, teaching, learning and home management; build personal prompt libraries; set up simple automations; verify AI output and stay safe from scams and misuse.",
      "Real-world problem": "The hours every professional, teacher, parent or entrepreneur loses to repetitive writing, planning and admin — the student reclaims that time and raises quality with AI workflows.",
      "Proof project": "My AI Transformation Project: a complete AI-assisted workflow for one real area of the student’s life or work — demonstrated live with a prompt library and measured time savings.",
      "Career translation": "Employment: AI-literate staff outperform peers in any role — administration, teaching, management. Entrepreneurship: run a leaner business or offer AI-assistance services. Further learning: data, digital marketing or advanced automation paths."
    },
    "levels": [
      {
        "kind": "Single course",
        "pre": "Basic smartphone or computer skills (browsing, email, WhatsApp). No programming, mathematics or technical background required. This course is built for lecturers, teachers, students, home managers, CEOs, entrepreneurs and anyone who wants AI working for them.",
        "expect": "Learn to use AI confidently and safely in business, education, home and everyday life. You will master practical prompting, use AI for documents, planning, marketing, teaching, learning and home management, set up simple no-code automations, and leave with a personal AI workflow that saves you real hours every week. We use AI tools — we do not build language models.",
        "mods": [
          {
            "n": "AI in Everyday Life: Foundations for Everyone",
            "t": "What AI is in plain language; where AI already runs your day (search, maps, banking, recommendations); the major assistants (ChatGPT, Gemini, Claude, Copilot, Meta AI); free vs paid tools; setting up accounts safely; what AI can and cannot do; myths, fears and honest limits"
          },
          {
            "n": "Talking to AI: Practical Prompting Skills",
            "t": "Asking clear questions; giving context and examples; role prompting; iterating and refining; prompt formulas for everyday tasks; voice and image inputs; fact-checking AI answers; avoiding hallucination traps"
          },
          {
            "n": "AI for Work & Business",
            "t": "Emails, letters and documents; reports, proposals and meeting minutes; spreadsheets and budgets; presentations; marketing content and social media; customer service replies; business planning and entrepreneurship; AI for CEOs and managers — summarisation and decision support"
          },
          {
            "n": "AI for Teaching, Learning & Personal Growth",
            "t": "For lecturers and teachers: lesson plans, quizzes, marking rubrics, differentiated materials. For students: study plans, revision aids, exam practice. Research assistance and citation caution; language learning; CVs, cover letters and interview preparation; personal development plans"
          },
          {
            "n": "AI at Home & in Daily Life",
            "t": "Meal planning and family budgets; travel planning; health and fitness information (and its limits); supporting children’s learning safely; creative projects — stories, images, music and videos; daily planning and smart routines"
          },
          {
            "n": "Everyday Automation, Safety & Responsible AI",
            "t": "What automation is (no coding); simple automations with Zapier or Make; calendar, email and reminder automation; AI bias and misinformation; privacy and personal data; scams, deepfakes and verification; Nigeria’s NDPA in plain terms; when NOT to use AI"
          },
          {
            "n": "Capstone: Your AI Transformation Project",
            "t": "Choose one real area of your life or work; design, build and demonstrate a complete AI-assisted workflow; measure the before/after difference; present your results"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Personal prompt library (25+ prompts refined for your real tasks)."
          },
          {
            "k": "Project 2",
            "t": "One-week content & customer-response pack for a real or mock business."
          },
          {
            "k": "Project 3",
            "t": "Family/home AI assistant kit — three working helpers for home life."
          },
          {
            "k": "Capstone",
            "t": "My AI Transformation Project — a complete AI-assisted workflow for one real area of your life or work, demonstrated live with measured time savings.  (see the Weekly Project Schedule)."
          }
        ]
      }
    ],
    "slug": "ai",
    "name": "Prompt Engineering & AI Automation",
    "short": "Prompt Engineering & AI",
    "ic": "bot",
    "cat": "data",
    "line": "Put AI to work in your studies, job or business. No coding needed.",
    "tags": [
      "AI assistants",
      "Prompting",
      "Automation"
    ],
    "tools": "Accounts on at least two AI assistants (ChatGPT, Gemini, Claude or Copilot; free tiers are fine), Canva (free) and a free Zapier or Make account. No programming tools needed."
  },
  {
    "certs": [
      "Google Digital Marketing & E-commerce Certificate",
      "Google Analytics Certification (GA4)",
      "Google Ads Certifications (Search, Display, Video)",
      "Meta Digital Marketing Associate",
      "HubSpot Content Marketing Certification"
    ],
    "fq": {
      "Need to know": "Branding and positioning, content marketing, social media strategy, SEO, paid advertising (Meta/Google), email marketing, analytics, and campaign planning with real budgets.",
      "Able to do": "Build a brand from strategy to visuals, run content calendars, launch and optimise paid campaigns, rank content on search, grow email lists, and prove ROI with analytics.",
      "Real-world problem": "A good business nobody has heard of — the student builds its brand, fills its funnel with customers, and proves the marketing spend paid for itself.",
      "Proof project": "A complete brand kit and 30-day content engine for a real or mock business (Beginner) and a full multi-channel campaign with paid ads, SEO and measured ROI (Advanced).",
      "Career translation": "Employment: digital marketer, social media manager, brand strategist. Entrepreneurship: marketing agency or freelance services; market your own business. Further learning: Google/Meta/HubSpot certifications, growth marketing."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "Basic social media usage. Creativity and communication skills. No marketing background required.",
        "expect": "Master the fundamentals of digital marketing, brand building, and online customer acquisition. Learn to run campaigns on Google, Meta, and LinkedIn, create content strategies, and measure results.",
        "mods": [
          {
            "n": "Digital Marketing Fundamentals & Brand Strategy",
            "t": "Marketing funnel, customer journey, digital channels, brand positioning, value proposition, target audience, brand voice, visual identity, storytelling"
          },
          {
            "n": "Content Creation, Social Media & SEO",
            "t": "Content types, blog writing, social media copy, Canva, CapCut, platform strategy (Instagram, TikTok, LinkedIn, Facebook), keyword research, on-page SEO, Google Search Console"
          },
          {
            "n": "Paid Advertising & Email Marketing",
            "t": "Google Ads basics (Search, Display), Meta Ads (Facebook/Instagram), campaign structure, bidding, targeting, list building, segmentation, Mailchimp/Brevo, email automation"
          },
          {
            "n": "Analytics & Conversion Tracking",
            "t": "Google Analytics 4, event tracking, conversion tracking, UTM parameters"
          },
          {
            "n": "Capstone: 30-Day Campaign",
            "t": "Create and run a 30-day digital marketing campaign with strategy, content, ads and an analytics report"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Brand identity package for a Nigerian startup."
          },
          {
            "k": "Project 2",
            "t": "30-day social media content calendar with designed posts."
          },
          {
            "k": "Project 3",
            "t": "SEO-optimized blog post with keyword research."
          },
          {
            "k": "Capstone",
            "t": "Complete digital marketing campaign for a real client or mock business with strategy deck, content assets, ad campaigns, and performance report."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Digital Marketing OR six or more months running campaigns OR experience managing a real ad budget.",
        "expect": "Master advanced marketing strategy, marketing automation, growth hacking, e-commerce optimization, and marketing analytics. Learn to lead marketing teams and drive scalable growth.",
        "mods": [
          {
            "n": "Advanced Strategy, SEO & Content",
            "t": "Integrated marketing communications, competitive positioning, technical SEO audit, schema markup, Core Web Vitals, content clusters, programmatic SEO"
          },
          {
            "n": "Advanced Paid Media, Automation & E-commerce",
            "t": "Performance Max, Shopping, YouTube Ads, LinkedIn Ads, TikTok Ads, HubSpot/Salesforce, lead scoring, nurture sequences, Shopify/WooCommerce optimization, CRO"
          },
          {
            "n": "Growth Hacking, Analytics & Leadership",
            "t": "AARRR, pirate metrics, viral loops, referral programs, community-led growth, advanced GA4, Looker Studio, BigQuery, attribution modeling, team structure, budget allocation"
          },
          {
            "n": "Capstone: Scale-Up Growth Campaign",
            "t": "Build a growth strategy for a scale-up, run a final campaign with a simulated budget, and present it in a board-style review"
          },
          {
            "n": "Certification Prep: Google Ads",
            "t": "Advanced Google Ads certification preparation, practice tests, review"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Technical SEO audit and remediation plan for an e-commerce site."
          },
          {
            "k": "Project 2",
            "t": "Multi-channel ad campaign with attribution analysis."
          },
          {
            "k": "Project 3",
            "t": "Marketing automation workflow with lead scoring."
          },
          {
            "k": "Capstone",
            "t": "Comprehensive marketing strategy for a Nigerian tech scale-up entering 2 new markets, with channel strategy, budget, team structure, and 12-month forecast."
          }
        ]
      }
    ],
    "slug": "marketing",
    "name": "Digital Marketing",
    "short": "Digital Marketing",
    "ic": "megaphone",
    "cat": "creative",
    "line": "Grow brands with content, ads and the numbers behind them.",
    "tags": [
      "SEO",
      "Paid ads",
      "Analytics"
    ],
    "tools": "Canva, CapCut, Meta Business Suite, Google Ads Editor and Mailchimp. A smartphone with a good camera."
  },
  {
    "name": "Social Media Management",
    "short": "Social Media Management",
    "ic": "share-2",
    "cat": "creative",
    "line": "Grow communities and customers for brands on every platform.",
    "tags": [
      "Content strategy",
      "Community",
      "Analytics"
    ],
    "tools": "Canva, CapCut, Meta Business Suite, Buffer or Later (free tiers), Google Analytics, and a smartphone with a good camera and the main social apps installed.",
    "certs": [
      "Meta Social Media Marketing Professional Certificate",
      "HubSpot Social Media Marketing Certification",
      "Hootsuite Platform Certification"
    ],
    "fq": {
      "Need to know": "How social platforms work, content strategy, copywriting and visual content, community management, scheduling and analytics, paid social basics, influencer collaboration, social listening and crisis handling.",
      "Able to do": "Plan and run social media for a brand: build a strategy and content calendar, create and schedule content, grow and engage a community, run basic paid campaigns and report on performance.",
      "Real-world problem": "A business posting at random with little engagement or sales from social media. The student builds a consistent, data-led presence that grows followers and leads.",
      "Proof project": "A managed social media campaign for a real or simulated brand: strategy, content calendar, published content, community playbook and an analytics report.",
      "Career translation": "Employment: social media manager, community manager, content creator, social media strategist. Entrepreneurship: a social media management agency or freelance service for SMEs. Further learning: Digital Marketing, Branding & Communications or Video Editing."
    },
    "levels": [
      {
        "kind": "Single course",
        "pre": "Active use of social media. Creativity and communication skills. No marketing background required.",
        "expect": "Learn to manage social media professionally. You will build strategies, create content, manage communities, run paid campaigns and report results, finishing with a month-long campaign for a brand.",
        "mods": [
          {
            "n": "Social Media Landscape & Strategy",
            "t": "Platform comparison (Instagram, TikTok, Facebook, LinkedIn, X, YouTube, WhatsApp Channels), audience research, goals and KPIs, competitor audit, strategy documents"
          },
          {
            "n": "Content Strategy & Planning",
            "t": "Content pillars, formats, hooks and storytelling, content calendars, trends and seasonality, user-generated content, repurposing content across platforms"
          },
          {
            "n": "Content Creation: Copy, Visuals & Video",
            "t": "Captions and copywriting, Canva design, smartphone photography, short-form video with CapCut, thumbnails and carousels, brand consistency, accessibility (alt text and captions)"
          },
          {
            "n": "Community Management & Engagement",
            "t": "Responding to comments and DMs, tone and moderation, community building, handling complaints and trolls, crisis response, social customer care, engagement tactics"
          },
          {
            "n": "Scheduling, Tools & Workflow",
            "t": "Meta Business Suite, Buffer, Hootsuite or Later, approval workflows, team collaboration, content libraries, reporting templates, time management"
          },
          {
            "n": "Paid Social & Influencer Marketing",
            "t": "Boosting posts, Meta Ads Manager basics, audience targeting, budgets, A/B testing, influencer selection and briefs, collaboration agreements, tracking results"
          },
          {
            "n": "Analytics, Reporting & Growth",
            "t": "Platform insights, key metrics, UTM tracking, social listening, monthly reports, optimisation cycles, presenting results to clients"
          },
          {
            "n": "Capstone: Run a Brand’s Social Presence",
            "t": "Manage a real or simulated brand’s social media for a month: strategy, content calendar, published content, engagement and a performance report"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Platform audit and strategy for a local brand."
          },
          {
            "k": "Project 2",
            "t": "Month-long content calendar with designed posts."
          },
          {
            "k": "Project 3",
            "t": "Short-form video series and a community response playbook."
          },
          {
            "k": "Capstone",
            "t": "Month-long social media campaign with an analytics report."
          }
        ]
      }
    ],
    "slug": "social"
  },
  {
    "name": "Graphics Design",
    "short": "Graphics Design",
    "ic": "palette",
    "cat": "creative",
    "line": "Create visuals that make brands look credible and memorable.",
    "tags": [
      "Photoshop",
      "Illustrator",
      "Brand identity"
    ],
    "tools": "Adobe Photoshop, Illustrator and InDesign (trial or licence), Figma and Canva. A laptop with 16GB RAM is recommended; a graphics tablet is optional.",
    "certs": [
      "Adobe Certified Professional: Visual Design (Photoshop)",
      "Adobe Certified Professional: Graphic Design & Illustration (Illustrator)",
      "Canva Design Essentials"
    ],
    "fq": {
      "Need to know": "Design principles (layout, hierarchy, typography and colour), industry tools (Photoshop, Illustrator, Figma, Canva), brand assets, print and digital production, file formats and the client workflow.",
      "Able to do": "Design logos, social media graphics, flyers, brochures, packaging mock-ups and brand kits; prepare files for print and web; and manage client briefs, feedback and revisions.",
      "Real-world problem": "A business whose visuals look inconsistent and unprofessional and cost it customers’ trust. The student creates a clear, consistent visual identity and marketing materials.",
      "Proof project": "A design portfolio with a logo and brand kit, a social campaign and print collateral (Beginner), and a complete brand identity system with packaging and a published case study (Advanced).",
      "Career translation": "Employment: graphic designer, social media designer, brand designer, print production assistant. Entrepreneurship: a design studio or freelance services on global marketplaces. Further learning: UI/UX design, motion design or art direction."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "No design experience required. Creativity and willingness to practise; all tools are taught from scratch.",
        "expect": "Learn design from first principles. You will master layout, type and colour, work confidently in Photoshop, Illustrator and Canva, and finish with a brand starter kit for a small business.",
        "mods": [
          {
            "n": "Design Principles & Visual Thinking",
            "t": "Layout, hierarchy, balance, contrast, alignment, white space, grids, visual storytelling, design critique, mood boards"
          },
          {
            "n": "Typography & Colour Theory",
            "t": "Type anatomy, font pairing, readability, colour psychology, colour models (RGB and CMYK), palettes, contrast and accessibility, brand colours"
          },
          {
            "n": "Photoshop: Image Editing & Social Graphics",
            "t": "Layers, masks, selections, retouching, compositing, text effects, social media post and ad design, exporting for web"
          },
          {
            "n": "Illustrator: Logos, Icons & Vector Art",
            "t": "Pen tool, shapes and paths, logo construction, icon design, vector illustration, artboards, export formats (SVG, PDF, PNG), presenting a logo"
          },
          {
            "n": "Canva & Figma for Fast Design",
            "t": "Templates and brand kits, presentations, flyers and posters, collaboration, design system basics, quick-turnaround workflows"
          },
          {
            "n": "Print & Digital Production",
            "t": "Print versus screen, bleed and margins, resolution, file formats, flyers, brochures and business cards, mock-ups, working with printers"
          },
          {
            "n": "Capstone: Brand Starter Kit",
            "t": "Create a complete starter kit for a small business: logo, colour palette, typography, social templates, flyer and business card"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Poster or flyer for a local event."
          },
          {
            "k": "Project 2",
            "t": "Logo set with variations."
          },
          {
            "k": "Project 3",
            "t": "Social media post templates for a business."
          },
          {
            "k": "Capstone",
            "t": "Brand starter kit with a short presentation."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Graphics Design OR a portfolio of at least three projects and working knowledge of Photoshop and Illustrator.",
        "expect": "Move from single designs to complete systems. You will build brand identities, packaging and campaign assets, and learn to price, pitch and publish your work professionally.",
        "mods": [
          {
            "n": "Brand Identity Systems & Strategy",
            "t": "Brand research, positioning, brand voice, logo systems, identity guidelines, brand books, applying an identity across touchpoints"
          },
          {
            "n": "Advanced Illustration & Composition",
            "t": "Advanced vector techniques, custom illustration, texture and shading, photo manipulation, creative concepts and art direction"
          },
          {
            "n": "Packaging & Print Design",
            "t": "Dielines, packaging mock-ups, label design, brochures, editorial layout with InDesign, preflight and colour management, working with print vendors"
          },
          {
            "n": "Motion & Digital Campaign Design",
            "t": "Animated social posts, banner ads, email design, presentation design, basic motion with After Effects or Canva, campaign consistency"
          },
          {
            "n": "UI Basics for Graphic Designers",
            "t": "Web and app interface fundamentals, Figma components, landing page design, design handoff, accessibility, working with developers"
          },
          {
            "n": "Freelancing, Pricing & Portfolio",
            "t": "Briefs, quotes and contracts, pricing models, client communication, handling revisions, Behance and Dribbble portfolios, marketplaces, licensing and intellectual property"
          },
          {
            "n": "Capstone: Full Brand Identity & Case Study",
            "t": "Develop a complete brand identity with guidelines, packaging, campaign assets and a published case study"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Brand guidelines document."
          },
          {
            "k": "Project 2",
            "t": "Product packaging with realistic mock-ups."
          },
          {
            "k": "Project 3",
            "t": "Multi-channel campaign set across social, banner and print."
          },
          {
            "k": "Capstone",
            "t": "Full brand identity, packaging and a published case study."
          }
        ]
      }
    ],
    "slug": "graphics"
  },
  {
    "name": "Video Editing",
    "short": "Video Editing",
    "ic": "clapperboard",
    "cat": "creative",
    "line": "Turn raw footage into stories people watch to the end.",
    "tags": [
      "Premiere Pro",
      "After Effects",
      "Colour grading"
    ],
    "tools": "Adobe Premiere Pro and After Effects (trial or licence), DaVinci Resolve (free), CapCut, Audacity and Canva. A laptop with 16GB RAM and a dedicated GPU, external storage, and a smartphone with a good camera are recommended.",
    "certs": [
      "Adobe Certified Professional: Video Design (Premiere Pro)",
      "Adobe Certified Professional: Visual Effects & Motion Graphics (After Effects)"
    ],
    "fq": {
      "Need to know": "Visual storytelling, shot composition, editing principles, audio basics, colour, motion graphics, social video formats, export settings and a professional content workflow.",
      "Able to do": "Plan and edit videos from raw footage: cut and sequence, add transitions, titles, music and sound, colour-correct, create motion graphics, and export for YouTube, Instagram, TikTok and broadcast.",
      "Real-world problem": "A brand or creator with hours of raw footage and weak engagement. The student turns it into polished, story-driven videos that hold attention.",
      "Proof project": "A showreel of edited pieces: a promo, a social video series and an event highlight (Beginner), plus a motion-graphics-enhanced brand film with colour grade and sound design (Advanced).",
      "Career translation": "Employment: video editor, social media video producer, motion graphics assistant, content creator. Entrepreneurship: video production for weddings, events, churches and brands, or a YouTube and TikTok content business. Further learning: motion design, cinematography or 3D."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "No editing experience required. A laptop capable of video editing and a creative eye.",
        "expect": "Learn the full editing workflow from storytelling to export. You will cut footage, add sound, titles and colour, edit for social media, and deliver polished videos for real audiences.",
        "mods": [
          {
            "n": "Storytelling & Video Fundamentals",
            "t": "Story structure, shot types and composition, smartphone camera basics, lighting basics, aspect ratios, frame rates, resolutions, formats and codecs"
          },
          {
            "n": "Editing Foundations in Premiere Pro & CapCut",
            "t": "Interface and workflow, importing and organising media, cutting and trimming, the timeline, transitions, keyframes, speed ramping, multi-camera basics, keyboard shortcuts"
          },
          {
            "n": "Audio: Music, Voice & Sound Design",
            "t": "Audio levels, noise reduction, voice-over recording, music selection and licensing, sound effects, mixing, syncing audio"
          },
          {
            "n": "Titles, Graphics & Colour Basics",
            "t": "Lower thirds, captions and subtitles, text animation, logos, colour correction versus colour grading, LUTs, skin-tone handling, basic masking"
          },
          {
            "n": "Editing for Social Media & Marketing",
            "t": "Reels, Shorts and TikTok formats, hooks and retention, vertical editing, content calendars, thumbnails, platform specifications, repurposing long-form content"
          },
          {
            "n": "Export, Delivery & Workflow",
            "t": "Export settings by platform, compression, project backups, file management, client feedback and revisions, copyright and licensing, showreel basics"
          },
          {
            "n": "Capstone: Brand Promo or Mini-Documentary",
            "t": "Plan, shoot or source, edit and deliver a short promotional video or mini-documentary with titles, music, colour and a social cut-down"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Short story edit from provided footage."
          },
          {
            "k": "Project 2",
            "t": "Social media video series with three vertical edits."
          },
          {
            "k": "Project 3",
            "t": "Event highlight reel with music and captions."
          },
          {
            "k": "Capstone",
            "t": "Brand promo or mini-documentary with social cut-downs."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Video Editing OR a portfolio of at least three edited videos and working knowledge of Premiere Pro, DaVinci Resolve or similar.",
        "expect": "Level up to professional post-production with motion graphics, advanced colour grading, sound design, and efficient workflows for client and agency work.",
        "mods": [
          {
            "n": "Advanced Editing Craft & Pacing",
            "t": "Narrative and documentary editing, J-cuts and L-cuts, rhythm and pacing, multi-camera editing, B-roll strategy, proxy workflows, editing interviews"
          },
          {
            "n": "Motion Graphics with After Effects",
            "t": "Keyframes and easing, shape and text animation, motion templates, masking and tracking, logo animation, lower-third packages, expressions basics"
          },
          {
            "n": "Colour Grading in DaVinci Resolve",
            "t": "Primary and secondary correction, scopes, node workflow, matching shots, creative looks, creating LUTs, log footage, HDR basics"
          },
          {
            "n": "Sound Design, Mixing & Delivery Standards",
            "t": "Dialogue clean-up, Foley, ambience, music editing, loudness standards, mixing for broadcast and web, captions and accessibility"
          },
          {
            "n": "The Business of Video: Clients, Pricing & Production",
            "t": "Briefs and proposals, pricing and contracts, managing edits as projects, collaboration and cloud review tools, building a showreel and personal brand, finding clients"
          },
          {
            "n": "Capstone: Professional Brand Film",
            "t": "Produce a polished brand film with motion graphics, colour grade, sound design and multiple deliverables for different platforms"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Animated logo and lower-third package."
          },
          {
            "k": "Project 2",
            "t": "Colour-graded cinematic short from log footage."
          },
          {
            "k": "Project 3",
            "t": "Documentary-style interview piece with sound design."
          },
          {
            "k": "Capstone",
            "t": "Professional brand film with platform-specific cut-downs."
          }
        ]
      }
    ],
    "slug": "video"
  },
  {
    "name": "Branding & Communications",
    "short": "Branding & Communications",
    "ic": "badge-check",
    "cat": "creative",
    "line": "Shape how people see an organisation, and say it clearly.",
    "tags": [
      "Brand strategy",
      "Copywriting",
      "Public relations"
    ],
    "tools": "Canva, Google Workspace or Microsoft 365, Notion or Trello, Grammarly (free), Meta Business Suite and Google Alerts. A smartphone with a good camera is recommended.",
    "certs": [
      "HubSpot Content Marketing Certification",
      "Google Digital Marketing & E-commerce Certificate",
      "Meta Certified Digital Marketing Associate"
    ],
    "fq": {
      "Need to know": "Brand strategy and positioning, brand identity, storytelling and copywriting, public relations, internal and external communications, content planning, reputation and crisis communication, and how to measure brand impact.",
      "Able to do": "Build a brand strategy and voice, write persuasive copy, craft press releases and media pitches, plan integrated campaigns, manage reputation and report on results.",
      "Real-world problem": "An organisation with a good product but a confusing message and no consistent voice. The student builds a clear brand story and a communications plan people can follow.",
      "Proof project": "A complete brand and communications playbook: strategy, voice guide, messaging, content calendar, media kit and crisis response plan.",
      "Career translation": "Employment: brand strategist, communications officer, PR associate, content strategist, copywriter. Entrepreneurship: a brand and communications consultancy for SMEs, NGOs and personal brands. Further learning: Digital Marketing, Graphics Design or public relations."
    },
    "levels": [
      {
        "kind": "Single course",
        "pre": "No prior experience required. A good command of English and an interest in storytelling and how brands shape perception.",
        "expect": "Learn how brands are built and communicated. You will define positioning, write in a consistent voice, work with the media, plan communications and measure impact, ending with a full brand and communications playbook.",
        "mods": [
          {
            "n": "Brand Fundamentals & Positioning",
            "t": "What a brand is, brand architecture, purpose, vision and values, positioning statements, target audiences, competitor analysis, personal versus corporate branding"
          },
          {
            "n": "Brand Identity & Visual Language",
            "t": "Brand names and taglines, logo and visual identity briefs, colour and typography direction, brand guidelines, working with designers, consistency across touchpoints"
          },
          {
            "n": "Brand Voice, Storytelling & Copywriting",
            "t": "Tone of voice, storytelling frameworks, headlines, web and social copy, scripts, editing and proofreading, writing for different audiences, persuasive writing"
          },
          {
            "n": "Public Relations & Media Relations",
            "t": "PR fundamentals, press releases, media lists and pitching, interviews and spokesperson training, events and sponsorships, influencer and community relations, working with journalists"
          },
          {
            "n": "Integrated Communications & Content Planning",
            "t": "Communication strategy, channel selection, campaign planning, content calendars, internal communications, newsletters, stakeholder messaging"
          },
          {
            "n": "Reputation, Crisis Communication & Ethics",
            "t": "Reputation management, monitoring and listening, crisis response plans, handling negative feedback, transparency, advertising ethics and standards in Nigeria (APCON), data privacy"
          },
          {
            "n": "Measuring Brand Impact",
            "t": "Brand awareness metrics, sentiment analysis, media monitoring, survey tools, reporting, return on communications, dashboards and presentations"
          },
          {
            "n": "Capstone: Brand & Communications Playbook",
            "t": "Build the full brand strategy, voice guide, content calendar, media kit and crisis plan for a real or simulated organisation, and present it"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Brand positioning and audience persona for a Nigerian business."
          },
          {
            "k": "Project 2",
            "t": "Brand voice guide with sample copy across three channels."
          },
          {
            "k": "Project 3",
            "t": "Press release and media pitch for a product or event launch."
          },
          {
            "k": "Capstone",
            "t": "Complete brand and communications playbook with a final presentation."
          }
        ]
      }
    ],
    "slug": "branding"
  },
  {
    "name": "Business Development",
    "short": "Business Development",
    "ic": "handshake",
    "cat": "business",
    "line": "Find customers, close deals and build the partnerships that grow a business.",
    "tags": [
      "Prospecting",
      "Sales & pitching",
      "Partnerships"
    ],
    "tools": "HubSpot CRM (free), Google Workspace or Microsoft 365, Canva, a LinkedIn account, Notion or Trello, and Excel or Google Sheets.",
    "certs": [
      "HubSpot Inbound Sales Certification",
      "Salesforce Certified Sales Representative",
      "Certified Professional Sales Person (CPSP)"
    ],
    "fq": {
      "Need to know": "How businesses find, win and keep customers: market research, customer discovery, value propositions, prospecting, sales and negotiation, partnerships, pricing, basic financial literacy, and CRM and pipeline management.",
      "Able to do": "Research a market, generate and qualify leads, build a sales pipeline in a CRM, pitch and negotiate, structure partnerships, write proposals and business plans, and track growth metrics.",
      "Real-world problem": "A small business with a good product but no steady stream of customers. The student finds the right customers, builds a repeatable sales process and lands the first deals.",
      "Proof project": "A go-to-market and sales playbook for a real or simulated business, with a lead pipeline, pitch deck and partnership proposal (Beginner), and a full revenue growth strategy with forecasts and a partnership programme (Advanced).",
      "Career translation": "Employment: business development executive, sales associate, partnerships officer, account manager. Entrepreneurship: run your own business or consultancy with a repeatable sales engine. Further learning: sales leadership, key-account management or growth strategy."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "No prior sales or business experience required. Good communication skills and curiosity about how businesses grow.",
        "expect": "Learn how businesses find, win and keep customers. You will research markets, build a lead pipeline, practise pitching and negotiation, and put together a sales and go-to-market plan.",
        "mods": [
          {
            "n": "Business Development Fundamentals",
            "t": "Business development versus sales and marketing, business models, value propositions, customer segments, ideal customer profile, growth levers, professionalism and ethics"
          },
          {
            "n": "Market Research & Customer Discovery",
            "t": "Desk research, competitor analysis, customer interviews and surveys, market sizing (TAM, SAM, SOM), problem validation, positioning for the Nigerian and wider African market"
          },
          {
            "n": "Prospecting & Lead Generation",
            "t": "Lead sources, LinkedIn and email outreach, phone and WhatsApp etiquette, referral and community channels, lead qualification (BANT), building prospect lists, outreach templates"
          },
          {
            "n": "Sales Process, Pitching & Negotiation",
            "t": "Sales stages, discovery calls, handling objections, storytelling and pitch decks, proposals and quotes, negotiation basics, closing, follow-up, customer onboarding"
          },
          {
            "n": "CRM, Pipeline & Sales Metrics",
            "t": "CRM setup with HubSpot, pipeline stages, activity tracking, conversion rates, forecasting basics, simple dashboards and reporting in spreadsheets"
          },
          {
            "n": "Business Planning & Financial Basics",
            "t": "Business model canvas, revenue models and pricing, costs and margins, break-even, cash-flow basics, simple projections, reading a profit-and-loss statement"
          },
          {
            "n": "Capstone: Go-to-Market & Sales Playbook",
            "t": "Choose a real or simulated business, research its market, build a lead pipeline, write the pitch and proposal, and present a go-to-market plan"
          },
          {
            "n": "Certification Prep",
            "t": "HubSpot Inbound Sales and Salesforce Sales Representative exam domains, practice questions, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Market research report and customer persona for a Nigerian business."
          },
          {
            "k": "Project 2",
            "t": "Outreach campaign with a prospect list and message sequences across email, LinkedIn and WhatsApp."
          },
          {
            "k": "Project 3",
            "t": "Sales pitch deck and a recorded mock pitch with feedback."
          },
          {
            "k": "Capstone",
            "t": "Go-to-market and sales playbook with a CRM pipeline, proposal and final presentation."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Business Development OR at least one year in sales, marketing or business roles.",
        "expect": "Move from closing deals to building growth. You will design account strategies, build partnerships and channels, manage complex sales cycles, forecast revenue and lead a business development function.",
        "mods": [
          {
            "n": "Strategic Account Management",
            "t": "Account planning, stakeholder mapping, upselling and cross-selling, customer success, renewals and retention, handling churn, customer lifetime value"
          },
          {
            "n": "Partnerships, Channels & Alliances",
            "t": "Partnership models (referral, reseller, strategic), partner identification and due diligence, proposals and agreements, co-marketing, channel programme design, working with agents and distributors"
          },
          {
            "n": "B2B, Enterprise & Public-Sector Sales",
            "t": "Complex sales cycles, buying committees, tenders and procurement (RFPs and RFQs), solution selling, value-based pricing, contract basics, SLAs, compliance considerations"
          },
          {
            "n": "Revenue Strategy, Forecasting & Analytics",
            "t": "Revenue models, pricing strategy, sales forecasting, quotas and territories, pipeline analytics, unit economics (CAC, LTV), dashboards in Sheets or Power BI"
          },
          {
            "n": "Negotiation, Leadership & Ethical Selling",
            "t": "Advanced negotiation, deal structuring, building and coaching a sales team, incentive design, anti-bribery and corruption awareness, executive presence"
          },
          {
            "n": "New Markets & Funding Basics",
            "t": "Cross-border trade basics, entering new markets, localisation, payments and currency considerations, investor pitching, funding options and grant applications for small businesses"
          },
          {
            "n": "Capstone: Growth Strategy & Partnership Programme",
            "t": "Build a complete growth strategy for a business: revenue plan, partnership programme, key-account plan, forecast and an investor-style presentation"
          },
          {
            "n": "Certification Prep",
            "t": "Exam preparation for HubSpot, Salesforce and CPSP: mock tests, scenario practice, review"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Key-account plan with expansion and retention strategy."
          },
          {
            "k": "Project 2",
            "t": "Partnership proposal and channel programme for a real or simulated company."
          },
          {
            "k": "Project 3",
            "t": "Tender response (RFP) with pricing and a compliance checklist."
          },
          {
            "k": "Capstone",
            "t": "Revenue growth strategy with forecast, partnership programme and an investor-style pitch."
          }
        ]
      }
    ],
    "slug": "business"
  },
  {
    "certs": [
      "Google Project Management Certificate",
      "Google UX Design Certificate",
      "Certified Scrum Product Owner (CSPO)",
      "Professional Scrum Product Owner (PSPO I)",
      "PMI Agile Certified Practitioner (PMI-ACP)"
    ],
    "fq": {
      "Need to know": "Product thinking, user research, product strategy and roadmapping, UX/UI design with Figma, agile delivery (Scrum/Kanban), product metrics, and stakeholder management.",
      "Able to do": "Discover real user problems, validate ideas cheaply, design and test prototypes, write requirements engineers can build from, run a sprint, and measure whether a product actually worked.",
      "Real-world problem": "Teams building products nobody wants — the student finds what users actually need, designs the solution, and leads the team to ship it.",
      "Proof project": "A researched, tested product design with an interactive Figma prototype (Beginner) and a complete product launch — strategy, roadmap, backlog, go-to-market and metrics review (Advanced).",
      "Career translation": "Employment: product manager, product designer, business analyst. Entrepreneurship: found or lead your own product with discipline. Further learning: PSPO/CSM, Google PM/UX certificates, senior product leadership."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "No technical background required. Interest in technology, business, and user behavior. Communication skills are essential.",
        "expect": "Learn the end-to-end product development lifecycle from ideation to launch. Master user research, prototyping, agile methodologies, and stakeholder management. Build a product portfolio.",
        "mods": [
          {
            "n": "Product Management Fundamentals & Research",
            "t": "Product lifecycle, types of PMs, user interviews, surveys, persona creation, journey mapping, competitive analysis, TAM/SAM/SOM"
          },
          {
            "n": "UX/UI Design & Agile Fundamentals",
            "t": "Design thinking, wireframing (Balsamiq), prototyping (Figma), usability principles, Scrum roles, ceremonies, user stories, acceptance criteria, sprint planning"
          },
          {
            "n": "Product Strategy, Roadmapping & Analytics",
            "t": "OKRs, prioritization frameworks (RICE, MoSCoW, Kano), roadmaps, AARRR framework, funnel analysis, Google Analytics 4, NPS, CSAT"
          },
          {
            "n": "Working with Engineering & Stakeholders",
            "t": "Working with engineers, release management, feature flags, managing up, cross-functional collaboration, writing PRDs"
          },
          {
            "n": "Capstone: Product Case Study",
            "t": "End-to-end product case study from research to pitch for the Nigerian market"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "User research plan and persona deck for a fintech app."
          },
          {
            "k": "Project 2",
            "t": "Low-fidelity wireframes and prototype for an e-commerce feature in Figma."
          },
          {
            "k": "Project 3",
            "t": "Product roadmap with prioritized features using RICE framework."
          },
          {
            "k": "Capstone",
            "t": "Complete product case study from problem discovery to launch plan with UX prototype, PRD, roadmap, and stakeholder pitch deck."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Product Management OR 1+ year in product/tech role.",
        "expect": "Master advanced product strategy, platform product management, data-driven decision making, and organizational leadership. Learn to manage complex products and drive growth.",
        "mods": [
          {
            "n": "Advanced Strategy, Growth & Monetization",
            "t": "Platform strategy, B2B vs B2C, internationalization, pricing strategy, PLG, growth loops, viral mechanics, LTV/CAC optimization, retention strategies"
          },
          {
            "n": "Data-Driven PM, Technical PM & Design Systems",
            "t": "SQL for PMs, experiment design, statistical significance, system design basics for PMs, API product management, AI/ML product management, advanced Figma, design systems"
          },
          {
            "n": "Enterprise Products, Leadership & Ethics",
            "t": "Enterprise sales cycles, SLAs, security requirements, hiring PMs, product team structure, ProdOps, GDPR/NDPR, ethical AI, accessibility compliance"
          },
          {
            "n": "Capstone: 0-to-1 Product Launch",
            "t": "Launch strategy for a complex platform: market analysis, GTM plan and investor pitch"
          },
          {
            "n": "Certification Prep: PSPO & CSPO",
            "t": "Exam preparation, practice tests, review"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Design and test a new onboarding flow with A/B test plan."
          },
          {
            "k": "Project 2",
            "t": "Build a comprehensive design system in Figma for a product suite."
          },
          {
            "k": "Capstone",
            "t": "Complete 0-to-1 product launch strategy for a complex platform (e.g., healthtech, edtech) with market analysis, technical requirements, GTM plan, and investor pitch."
          }
        ]
      }
    ],
    "slug": "product",
    "name": "Product Management & Design",
    "short": "Product Management & Design",
    "ic": "lightbulb",
    "cat": "business",
    "line": "Take a product from idea to launch, from user research to roadmap.",
    "tags": [
      "User research",
      "Figma",
      "Roadmapping"
    ],
    "tools": "Figma, Miro, Notion, Slack, Loom, Balsamiq and a GA4 demo account."
  },
  {
    "name": "Project Management",
    "short": "Project Management",
    "ic": "folder-kanban",
    "cat": "business",
    "line": "Plan, run and deliver projects on time, on budget and with confidence.",
    "tags": [
      "Planning",
      "Agile & Scrum",
      "Risk management"
    ],
    "tools": "MS Project or ProjectLibre, Jira, Trello or Asana (free tiers), Excel or Google Sheets, Miro, Notion, Slack and Loom.",
    "certs": [
      "Certified Associate in Project Management (CAPM)",
      "Google Project Management Certificate",
      "PRINCE2 Foundation",
      "Professional Scrum Master I (PSM I)"
    ],
    "fq": {
      "Need to know": "How projects are planned, executed and closed: scoping, scheduling, budgeting, risk and stakeholder management, Agile and traditional methods, project tools, reporting and team leadership.",
      "Able to do": "Define scope, build a work breakdown and schedule, manage budget and risk, run Agile ceremonies, track progress with tools, communicate with stakeholders and lead teams to deliver.",
      "Real-world problem": "A project running late and over budget with unclear roles and unhappy stakeholders. The student restores control with a clear plan, risk log, communication rhythm and delivery tracking.",
      "Proof project": "A full project management plan (charter, WBS, schedule, budget, risk register and communication plan) for a real or simulated project (Beginner), and the Agile or hybrid delivery of a multi-team programme with dashboards and a closure report (Advanced).",
      "Career translation": "Employment: project coordinator, project manager, scrum master, PMO analyst. Entrepreneurship: project delivery consultancy for NGOs, SMEs, construction and technology teams. Further learning: PMP, programme management or product management."
    },
    "levels": [
      {
        "kind": "Beginner",
        "pre": "No prior project management experience required. Basic computer skills and clear communication.",
        "expect": "Learn how to manage projects from initiation to closure: planning, scheduling, budgeting, risk and stakeholder management, using both Agile and traditional approaches.",
        "mods": [
          {
            "n": "Project Management Fundamentals",
            "t": "Project life cycle, projects versus operations, roles and responsibilities, project charters, success criteria, methodologies (Waterfall, Agile, hybrid), professional ethics"
          },
          {
            "n": "Scope, Requirements & Stakeholders",
            "t": "Requirements gathering, scope statements, work breakdown structure, stakeholder analysis, RACI matrix, managing expectations, change control"
          },
          {
            "n": "Scheduling, Budgeting & Resources",
            "t": "Task sequencing, critical path method, Gantt charts, estimation techniques, resource planning, cost estimating, budgets, earned value basics, MS Project and spreadsheets"
          },
          {
            "n": "Risk, Quality & Procurement",
            "t": "Risk identification and assessment, risk registers, response strategies, quality planning and assurance, issue management, vendor selection and contract basics"
          },
          {
            "n": "Agile & Scrum Essentials",
            "t": "Agile values and principles, Scrum roles, events and artefacts, user stories, backlogs, sprint planning, retrospectives, Kanban, Jira, Trello and Asana"
          },
          {
            "n": "Communication, Leadership & Reporting",
            "t": "Communication planning, effective meetings, status reports and dashboards, negotiation and conflict resolution, team motivation, remote and cross-functional teams"
          },
          {
            "n": "Capstone: Project Management Plan",
            "t": "Plan a real or simulated project end to end: charter, scope, WBS, schedule, budget, risk register, communication plan and a stakeholder presentation"
          },
          {
            "n": "Certification Prep",
            "t": "CAPM and Google Project Management Certificate domains, practice questions, exam strategy"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Project charter and stakeholder analysis for a community or business project."
          },
          {
            "k": "Project 2",
            "t": "Schedule and budget in Excel or MS Project with a critical path analysis."
          },
          {
            "k": "Project 3",
            "t": "Scrum sprint simulation in Jira with a backlog, sprint plan and retrospective."
          },
          {
            "k": "Capstone",
            "t": "Complete project management plan with a stakeholder presentation."
          }
        ]
      },
      {
        "kind": "Advanced",
        "pre": "Completion of Beginner Project Management OR at least one year coordinating or managing projects.",
        "expect": "Lead complex projects and programmes with hybrid delivery, portfolio thinking, advanced risk and cost control, vendor management and leadership of multiple teams.",
        "mods": [
          {
            "n": "Advanced Planning, Estimation & Cost Control",
            "t": "Advanced scheduling, resource levelling, earned value management, forecasting, contingency and reserves, baselines and variance analysis"
          },
          {
            "n": "Agile at Scale & Hybrid Delivery",
            "t": "Scaling frameworks (SAFe and LeSS overview), release planning, OKRs, hybrid approaches, DevOps awareness, delivery metrics, coaching Agile teams"
          },
          {
            "n": "Programme & Portfolio Management",
            "t": "Programmes versus portfolios, benefits realisation, prioritisation, governance, setting up a PMO, cross-project dependencies, executive reporting"
          },
          {
            "n": "Risk, Contracts & Vendor Management",
            "t": "Quantitative risk analysis, contingency planning, contract types, negotiating with vendors, procurement documents, claims and disputes, compliance"
          },
          {
            "n": "Leadership, Change & Stakeholder Influence",
            "t": "Leading without authority, change management models, handling resistance, coaching, emotional intelligence, executive communication, ethical dilemmas"
          },
          {
            "n": "Capstone: Multi-Team Programme Delivery",
            "t": "Plan and run a simulated multi-team programme with dashboards, risk management, stakeholder reporting and a closure report"
          },
          {
            "n": "Certification Prep: PMP-Style Practice, PRINCE2 & PSM I",
            "t": "Situational question practice, PRINCE2 principles, Scrum Master exam preparation, mock exams"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Earned value dashboard for a running project."
          },
          {
            "k": "Project 2",
            "t": "Hybrid delivery plan with a release roadmap and KPIs."
          },
          {
            "k": "Project 3",
            "t": "Vendor selection and contract negotiation exercise."
          },
          {
            "k": "Capstone",
            "t": "Programme delivery pack with dashboards and a closure report."
          }
        ]
      }
    ],
    "slug": "project"
  },
  {
    "name": "Virtual Assistant",
    "short": "Virtual Assistant",
    "ic": "headphones",
    "cat": "business",
    "line": "Run the admin so busy founders and executives can focus on growth.",
    "tags": [
      "Executive support",
      "Productivity tools",
      "Automation"
    ],
    "tools": "Google Workspace and Microsoft 365 (free or trial), Calendly, Trello or Asana, Notion, Zapier or Make (free tier), Slack, Zoom, Loom and a reliable headset.",
    "certs": [
      "Microsoft Office Specialist (MOS)",
      "Microsoft 365 Fundamentals (MS-900)",
      "Google Project Management Certificate"
    ],
    "fq": {
      "Need to know": "Administrative support skills: calendar, email and inbox management, document preparation, travel and meeting coordination, customer support, research and data entry, productivity tools, remote-work etiquette, confidentiality and freelancing for international clients.",
      "Able to do": "Manage an executive’s calendar and inbox, prepare documents and reports, coordinate meetings and travel, support customers, use project and automation tools, and run a remote VA business.",
      "Real-world problem": "A busy founder or executive buried in email, scheduling conflicts and admin tasks. The student takes over the workload with reliable systems and clear communication.",
      "Proof project": "A complete VA toolkit: a managed mock executive’s calendar and inbox, standard operating procedures, a research brief and a service portfolio with pricing.",
      "Career translation": "Employment: virtual assistant, executive assistant, administrative officer, customer support associate. Entrepreneurship: independent VA services for local and international clients, specialising in a niche such as real estate, e-commerce or coaching. Further learning: Project Management, Digital Marketing or Social Media Management."
    },
    "levels": [
      {
        "kind": "Single course",
        "pre": "Basic computer skills and good written English. No prior experience required.",
        "expect": "Learn to deliver professional remote administrative support. You will master calendars, inboxes, documents, research and customer support, use automation tools, and set up your own virtual assistant service.",
        "mods": [
          {
            "n": "The Virtual Assistant Profession",
            "t": "What VAs do, VA niches, remote-work etiquette, professionalism, confidentiality and data protection, time-zone management, setting up a home office, ethics"
          },
          {
            "n": "Calendar, Email & Executive Support",
            "t": "Inbox management, scheduling and calendar tools (Google Calendar, Calendly), meeting preparation, minutes and follow-up, travel booking and itineraries, expense reports, prioritisation"
          },
          {
            "n": "Productivity Suites & Document Skills",
            "t": "Google Workspace and Microsoft 365, Word and Docs, Excel and Sheets formulas, Slides and PowerPoint, PDF tools, templates, formatting professional documents"
          },
          {
            "n": "Research, Data Entry & Reporting",
            "t": "Online research methods, fact-checking, accurate data entry, spreadsheets and databases, simple reports, summarising, using AI assistants responsibly"
          },
          {
            "n": "Customer Support & Communication",
            "t": "Chat, email and phone support, handling complaints, helpdesk tools (Zendesk, Freshdesk), WhatsApp Business, communication tone, CRM basics"
          },
          {
            "n": "Project Coordination & Automation Tools",
            "t": "Task management with Trello, Asana and Notion, writing SOPs, Zapier and Make automations, team communication with Slack, workflow design"
          },
          {
            "n": "Business Skills for Freelance VAs",
            "t": "Choosing a niche, service packages and pricing, proposals and contracts, finding clients on LinkedIn and freelance platforms, getting paid internationally, invoicing, building a portfolio, client retention"
          },
          {
            "n": "Capstone: Virtual Assistant Toolkit",
            "t": "Complete a simulated engagement: manage a mock executive’s calendar and inbox, write SOPs, deliver a research brief and present your service portfolio"
          }
        ],
        "projs": [
          {
            "k": "Project 1",
            "t": "Inbox and calendar management exercise for a mock executive."
          },
          {
            "k": "Project 2",
            "t": "Professional document pack: a report, a spreadsheet and a presentation."
          },
          {
            "k": "Project 3",
            "t": "Automated workflow built with Zapier or Make, with an SOP."
          },
          {
            "k": "Capstone",
            "t": "Virtual assistant toolkit and service portfolio."
          }
        ]
      }
    ],
    "slug": "va"
  }
] as Programme[];

export const PROGRAMME_CATEGORIES: ProgrammeCategoryInfo[] = [
  {
    "id": "software",
    "name": "Software & Web",
    "ic": "code"
  },
  {
    "id": "infra",
    "name": "Cloud, Security & IT",
    "ic": "shield-check"
  },
  {
    "id": "data",
    "name": "Data & AI",
    "ic": "bar-chart-3"
  },
  {
    "id": "creative",
    "name": "Creative & Marketing",
    "ic": "palette"
  },
  {
    "id": "business",
    "name": "Business & Management",
    "ic": "briefcase"
  }
];

export const FEATURED_PROGRAMME_SLUGS: string[] = [
  "fullstack",
  "mobile",
  "data",
  "cloud",
  "cyber",
  "marketing",
  "graphics",
  "business",
  "product",
  "va"
];

export const FINDER_INTERESTS = [
  [
    "build",
    "Building websites and apps"
  ],
  [
    "systems",
    "Keeping systems running and secure"
  ],
  [
    "data",
    "Working with data and AI"
  ],
  [
    "create",
    "Designing and creating content"
  ],
  [
    "grow",
    "Marketing and growing brands"
  ],
  [
    "lead",
    "Leading products and projects"
  ],
  [
    "sell",
    "Selling and building partnerships"
  ],
  [
    "support",
    "Organising and supporting teams"
  ]
];

export const FINDER_INTEREST_MAP: Record<string, string[]> = {
  "build": [
    "fullstack",
    "frontend",
    "backend",
    "mobile"
  ],
  "systems": [
    "cloud",
    "cyber",
    "network",
    "itsupport"
  ],
  "data": [
    "data",
    "ai"
  ],
  "create": [
    "graphics",
    "video",
    "branding",
    "social"
  ],
  "grow": [
    "marketing",
    "social",
    "branding",
    "business"
  ],
  "lead": [
    "product",
    "project",
    "business"
  ],
  "sell": [
    "business",
    "marketing"
  ],
  "support": [
    "va",
    "project",
    "itsupport"
  ]
};

export const FINDER_TECH_WEIGHT: Record<string, number> = {
  "frontend": 2,
  "backend": 2,
  "fullstack": 2,
  "mobile": 2,
  "cloud": 2,
  "cyber": 2,
  "network": 2,
  "itsupport": 1,
  "data": 1,
  "ai": 0,
  "marketing": 0,
  "social": 0,
  "graphics": 0,
  "video": 0,
  "branding": 0,
  "business": 0,
  "product": 1,
  "project": 0,
  "va": 0
};

export const FINDER_TECH_QUESTIONS: [string, string][] = [
  [
    "2",
    "Very hands-on technical: code, servers or security"
  ],
  [
    "1",
    "A mix of technical and people skills"
  ],
  [
    "0",
    "Mostly creative or people-focused"
  ]
];

export const KIDS_PROGRAMMES: KidsProgramme[] = [
  {
    "ic": "code",
    "t": "Young Coders",
    "d": "Start with Scratch, then move on to HTML and simple Python. Build games and small websites.",
    "tags": [
      "Scratch",
      "HTML",
      "Python"
    ]
  },
  {
    "ic": "palette",
    "t": "Creative Studio",
    "d": "Design posters, edit short videos and bring ideas to life with Canva and CapCut.",
    "tags": [
      "Canva",
      "CapCut",
      "Design"
    ]
  },
  {
    "ic": "brain",
    "t": "AI Explorers",
    "d": "Find out how AI works, use it safely and creatively, and learn to spot what is real online.",
    "tags": [
      "AI tools",
      "Safe use",
      "Creativity"
    ]
  },
  {
    "ic": "shield-check",
    "t": "Digital Skills & Safety",
    "d": "Typing, computer basics, safe browsing, strong passwords and good online manners.",
    "tags": [
      "Computer basics",
      "Online safety"
    ]
  },
  {
    "ic": "lightbulb",
    "t": "Young Entrepreneurs",
    "d": "Spot a problem, shape an idea, price it and pitch it like a real founder.",
    "tags": [
      "Ideas",
      "Pitching",
      "Money basics"
    ]
  },
  {
    "ic": "smartphone",
    "t": "App Makers",
    "d": "Turn an idea into a simple mobile app using beginner-friendly tools.",
    "tags": [
      "App design",
      "No-code tools"
    ]
  }
];

export const KID_AGE_BANDS: string[] = [
  "Kids (7 to 12)",
  "Teens (13 to 17)"
];

export const STUDENT_STORIES: StudentStory[] = [
  {
    "n": "Chiamaka Obi",
    "s": "frontend",
    "p": 4,
    "q": "I came in knowing no code. By the end I had a live portfolio site and my first freelance client.",
    "r": "Frontend Development"
  },
  {
    "n": "Tunde Adeyemi",
    "s": "cloud",
    "p": 1,
    "q": "The projects made the difference. I could show real AWS work in my interviews.",
    "r": "Cloud & DevOps"
  },
  {
    "n": "Zainab Bello",
    "s": "marketing",
    "p": 5,
    "q": "I ran my first paid campaign for a real business before the programme even ended.",
    "r": "Digital Marketing"
  },
  {
    "n": "Emeka Okafor",
    "s": "backend",
    "p": 3,
    "q": "Building and deploying a real API gave me the confidence to apply for developer roles.",
    "r": "Backend Development"
  },
  {
    "n": "Amaka Udeh",
    "s": "graphics",
    "p": 8,
    "q": "I left with a brand kit, a case study and the courage to price my own work.",
    "r": "Graphics Design"
  },
  {
    "n": "Ifeoma Nwosu",
    "s": "data",
    "p": 2,
    "q": "Turning raw spreadsheets into a dashboard my manager actually uses was a proud moment.",
    "r": "Data Analytics & BI"
  },
  {
    "n": "Kelechi Onuoha",
    "s": "va",
    "p": 9,
    "q": "I now support two clients abroad with calendars, inboxes and research, all remotely.",
    "r": "Virtual Assistant"
  },
  {
    "n": "Seun Ajayi",
    "s": "video",
    "p": 6,
    "q": "My showreel got me my first paid shoot. The sound and colour modules changed my edits.",
    "r": "Video Editing"
  }
];

export const TALENT_PROFILES: TalentProfile[] = [
  {
    "id": "t1",
    "n": "Chiamaka Obi",
    "s": "frontend",
    "p": 4,
    "role": "Frontend developer",
    "skills": [
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    "av": "Open to full-time",
    "bio": "Builds fast, accessible interfaces and enjoys turning designs into polished products.",
    "proj": "E-commerce frontend with cart, checkout and authentication."
  },
  {
    "id": "t2",
    "n": "Tunde Adeyemi",
    "s": "cloud",
    "p": 1,
    "role": "Cloud and DevOps engineer",
    "skills": [
      "AWS",
      "Docker",
      "Terraform"
    ],
    "av": "Open to contract",
    "bio": "Automates deployments and keeps cloud costs and uptime under control.",
    "proj": "Auto-scaling web application with a CI/CD pipeline on AWS."
  },
  {
    "id": "t3",
    "n": "Ifeoma Nwosu",
    "s": "data",
    "p": 2,
    "role": "Data analyst",
    "skills": [
      "SQL",
      "Power BI",
      "Python"
    ],
    "av": "Available for projects",
    "bio": "Turns messy data into dashboards and clear recommendations for decision-makers.",
    "proj": "Executive sales dashboard for a retail SME."
  },
  {
    "id": "t4",
    "n": "Emeka Okafor",
    "s": "backend",
    "p": 3,
    "role": "Backend developer",
    "skills": [
      "Python",
      "Django",
      "PostgreSQL"
    ],
    "av": "Open to full-time",
    "bio": "Designs reliable APIs with clean data models and solid authentication.",
    "proj": "Social platform API with JWT authentication, deployed to the cloud."
  },
  {
    "id": "t5",
    "n": "Zainab Bello",
    "s": "marketing",
    "p": 5,
    "role": "Digital marketer",
    "skills": [
      "Meta Ads",
      "SEO",
      "Analytics"
    ],
    "av": "Available for projects",
    "bio": "Plans and runs campaigns that bring in customers and reports on every naira spent.",
    "proj": "30-day multi-channel campaign for a local brand."
  },
  {
    "id": "t6",
    "n": "Chidi Eze",
    "s": "cyber",
    "p": 7,
    "role": "Security analyst",
    "skills": [
      "SOC",
      "Vulnerability assessment",
      "Linux hardening"
    ],
    "av": "Open to full-time",
    "bio": "Monitors threats, tests defences and writes reports that teams act on.",
    "proj": "Network security audit and phishing simulation for a mock company."
  },
  {
    "id": "t7",
    "n": "Amaka Udeh",
    "s": "graphics",
    "p": 8,
    "role": "Graphic and brand designer",
    "skills": [
      "Illustrator",
      "Photoshop",
      "Brand identity"
    ],
    "av": "Available for projects",
    "bio": "Creates consistent visual identities, from logos to packaging.",
    "proj": "Complete brand kit and packaging for a food business."
  },
  {
    "id": "t8",
    "n": "Seun Ajayi",
    "s": "video",
    "p": 6,
    "role": "Video editor",
    "skills": [
      "Premiere Pro",
      "After Effects",
      "Colour grading"
    ],
    "av": "Open to contract",
    "bio": "Edits promos, social series and event films with strong pacing and sound.",
    "proj": "Brand promo with motion graphics and social cut-downs."
  },
  {
    "id": "t9",
    "n": "Blessing Ekpo",
    "s": "project",
    "p": 0,
    "role": "Project coordinator",
    "skills": [
      "Agile & Scrum",
      "MS Project",
      "Risk management"
    ],
    "av": "Open to full-time",
    "bio": "Keeps projects on time and stakeholders informed with clear plans and reporting.",
    "proj": "Full project management plan with schedule, budget and risk register."
  },
  {
    "id": "t10",
    "n": "Kelechi Onuoha",
    "s": "va",
    "p": 9,
    "role": "Virtual assistant",
    "skills": [
      "Executive support",
      "Zapier",
      "Customer support"
    ],
    "av": "Available for projects",
    "bio": "Runs calendars, inboxes and research so busy founders can focus on growth.",
    "proj": "Virtual assistant toolkit with SOPs and an automated workflow."
  },
  {
    "id": "t11",
    "n": "Ngozi Anyanwu",
    "s": "product",
    "p": 2,
    "role": "Product manager",
    "skills": [
      "User research",
      "Roadmapping",
      "Figma"
    ],
    "av": "Open to full-time",
    "bio": "Turns user problems into prioritised roadmaps and well-scoped products.",
    "proj": "Product case study from research to investor-style pitch."
  },
  {
    "id": "t12",
    "n": "Obinna Nwankwo",
    "s": "fullstack",
    "p": 7,
    "role": "Full-stack developer",
    "skills": [
      "Next.js",
      "Node.js",
      "PostgreSQL"
    ],
    "av": "Open to contract",
    "bio": "Ships complete web products, from database design to deployment.",
    "proj": "Booking application with payments and an admin dashboard."
  }
];

/** PLACEHOLDER: sample issued certificates for the Verify page demo. */
export const VERIFY_RECORDS: Record<string, VerifyRecord> = {
  "TFN-CERT-0001": {
    "n": "Chiamaka Obi",
    "s": "frontend",
    "l": "Beginner"
  },
  "TFN-CERT-0002": {
    "n": "Tunde Adeyemi",
    "s": "cloud",
    "l": "Advanced"
  },
  "TFN-CERT-0003": {
    "n": "Zainab Bello",
    "s": "marketing",
    "l": "Beginner"
  }
} as Record<string, VerifyRecord>;

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "choose-your-first-tech-skill",
    "t": "How to choose your first tech skill",
    "cat": "Career Guides",
    "read": "5 min read",
    "ic": "compass",
    "v": 0,
    "ex": "Too many options can freeze you. Here is a simple way to pick one skill and start.",
    "body": [
      [
        "p",
        "Most beginners do not struggle to find a tech skill. They struggle to choose one. Every list online says something different, and it is easy to spend months comparing instead of learning."
      ],
      [
        "h",
        "Start with what you enjoy"
      ],
      [
        "p",
        "Think about the kind of work that holds your attention. Do you like building things, designing them, analysing information or organising people? The answer points to a family of skills rather than a single tool."
      ],
      [
        "h",
        "Ask three practical questions"
      ],
      [
        "ul",
        [
          "What problem do I enjoy solving?",
          "Can I start with the equipment and time I have right now?",
          "Is there a clear path from this skill to paid work or my own business?"
        ]
      ],
      [
        "h",
        "Pick one and commit"
      ],
      [
        "p",
        "Choosing a good-enough skill and sticking with it beats endlessly searching for the perfect one. You can always add a second skill once the first one pays off."
      ]
    ]
  },
  {
    "slug": "beginner-projects-for-your-portfolio",
    "t": "Five beginner projects that make a portfolio stand out",
    "cat": "Career Guides",
    "read": "4 min read",
    "ic": "layers",
    "v": 1,
    "ex": "Employers want proof. These starter projects show real skill without needing years of experience.",
    "body": [
      [
        "p",
        "A portfolio is simply proof that you can do the work. You do not need a long list. A few well-finished projects tell a stronger story than many half-built ones."
      ],
      [
        "h",
        "Five ideas to start with"
      ],
      [
        "ul",
        [
          "A personal website that explains who you are and what you do.",
          "A budget or task tracker that solves a small daily problem.",
          "A landing page or social campaign for a local business.",
          "A dashboard built from open public data.",
          "A brand kit for a small business you know."
        ]
      ],
      [
        "h",
        "Finish and explain"
      ],
      [
        "p",
        "For every project, write a short note on the problem, what you built and what you learned. Clear explanations show how you think, which matters as much as the final result."
      ]
    ]
  },
  {
    "slug": "what-does-a-devops-engineer-do",
    "t": "What does a DevOps engineer actually do?",
    "cat": "Industry Insights",
    "read": "5 min read",
    "ic": "cloud",
    "v": 2,
    "ex": "A plain-language look at the role that keeps modern software running.",
    "body": [
      [
        "p",
        "When an app loads quickly, updates without breaking and stays online during a busy day, there is usually a DevOps engineer behind it. The role sits between building software and running it."
      ],
      [
        "h",
        "The everyday work"
      ],
      [
        "ul",
        [
          "Automating how code is tested and released.",
          "Setting up and managing cloud servers and containers.",
          "Monitoring systems and responding when something fails.",
          "Keeping costs and security under control."
        ]
      ],
      [
        "h",
        "Skills to start with"
      ],
      [
        "p",
        "Comfort with Linux and the command line, a cloud platform such as AWS, version control with Git and an understanding of containers form a strong base. From there, automation tools and monitoring come naturally."
      ]
    ]
  },
  {
    "slug": "digital-marketing-skills-businesses-need",
    "t": "Digital marketing skills businesses look for",
    "cat": "Industry Insights",
    "read": "4 min read",
    "ic": "megaphone",
    "v": 0,
    "ex": "From content to analytics, here is what turns marketing knowledge into results.",
    "body": [
      [
        "p",
        "Businesses rarely hire someone only to post online. They want people who can bring in customers and show what worked. That takes a mix of creative and analytical skills."
      ],
      [
        "h",
        "Skills that stand out"
      ],
      [
        "ul",
        [
          "Writing clear, persuasive copy for different channels.",
          "Running and measuring paid campaigns on Google and Meta.",
          "Understanding search and how people find a business online.",
          "Reading analytics and turning numbers into decisions."
        ]
      ],
      [
        "h",
        "Show results, not just activity"
      ],
      [
        "p",
        "When you describe your work, lead with outcomes: the audience you reached, the leads you generated and what you changed after reading the data."
      ]
    ]
  },
  {
    "slug": "learn-faster-studying-part-time",
    "t": "How to learn faster when you study part-time",
    "cat": "Study Tips",
    "read": "4 min read",
    "ic": "book-open",
    "v": 1,
    "ex": "Short, regular practice beats occasional long sessions. A few habits that help.",
    "body": [
      [
        "p",
        "Studying around school, work or family is challenging, but it is also common. The learners who progress are rarely the ones with the most free time. They are the ones with a steady routine."
      ],
      [
        "h",
        "Build a routine you can keep"
      ],
      [
        "p",
        "Short, regular practice sessions are more effective than rare marathons. Fix a time, protect it and keep a list of what you will tackle next so you never waste time deciding."
      ],
      [
        "h",
        "Learn by doing"
      ],
      [
        "p",
        "Apply every new idea to a small project straight away. Building something, even something simple, makes concepts stick far better than re-reading notes."
      ],
      [
        "h",
        "Ask for help early"
      ],
      [
        "p",
        "Getting stuck is part of learning. Share your questions with classmates and instructors before frustration builds up."
      ]
    ]
  },
  {
    "slug": "start-as-a-virtual-assistant",
    "t": "Getting started as a virtual assistant for global clients",
    "cat": "Career Guides",
    "read": "5 min read",
    "ic": "headphones",
    "v": 2,
    "ex": "Remote admin support is a practical way to earn from home. Here is how to begin.",
    "body": [
      [
        "p",
        "Founders, coaches and small companies around the world need reliable help with scheduling, email, research and customer messages. A good virtual assistant makes that work disappear."
      ],
      [
        "h",
        "Build the core skills"
      ],
      [
        "ul",
        [
          "Calendar and inbox management.",
          "Spreadsheets, documents and presentations.",
          "Clear written communication and professionalism.",
          "Project and automation tools such as Trello and Zapier."
        ]
      ],
      [
        "h",
        "Choose a niche and package your service"
      ],
      [
        "p",
        "Specialising, for example in e-commerce or real estate, makes you easier to remember and easier to price. Define what you offer, how you work and how clients can reach you, then build a small portfolio of sample work."
      ]
    ]
  },
  {
    "slug": "why-kids-should-learn-digital-skills",
    "t": "Why children should start learning digital skills early",
    "cat": "Kids & Teens",
    "read": "4 min read",
    "ic": "smile",
    "v": 0,
    "ex": "Digital skills are life skills. Starting young builds confidence, creativity and safety.",
    "body": [
      [
        "p",
        "Children already spend time with phones, games and videos. Teaching them to create with technology, not just consume it, builds skills they will use in school and in any future career."
      ],
      [
        "h",
        "More than coding"
      ],
      [
        "p",
        "Digital skills include creating and editing content, thinking through problems step by step, using AI tools sensibly and staying safe online. These help children in every subject."
      ],
      [
        "h",
        "Learning should be fun"
      ],
      [
        "p",
        "Projects work best: a simple game, a poster, a short video or a small app. When children make something they are proud of, they want to learn more."
      ]
    ]
  },
  {
    "slug": "certifications-that-help-beginners",
    "t": "How certifications help beginners get noticed",
    "cat": "Career Guides",
    "read": "4 min read",
    "ic": "award",
    "v": 1,
    "ex": "A certification is not a shortcut, but it can open doors when paired with real projects.",
    "body": [
      [
        "p",
        "Employers often receive many applications that look alike. A recognised certification gives them a quick signal that you have covered the fundamentals."
      ],
      [
        "h",
        "Pair certificates with proof"
      ],
      [
        "p",
        "A certification shows what you studied. A project shows what you can do. Together they make a much stronger case than either one alone."
      ],
      [
        "h",
        "Choose certifications that fit your path"
      ],
      [
        "p",
        "Pick credentials that match the roles you want, such as cloud, security, data or project management, and prepare properly. Practice questions and hands-on labs matter more than memorising notes."
      ]
    ]
  }
];

export const HUB_SPACES: HubSpace[] = [
  {
    "id": "training",
    "n": "Training room",
    "cap": 28,
    "ic": "presentation",
    "v": 0,
    "d": "Host small-size entrepreneurship sessions, workshops and webinar trainings.",
    "feat": [
      "Up to 28 seats",
      "Presentation screen and sound",
      "Stable power and fast Wi-Fi",
      "Air-conditioned"
    ]
  },
  {
    "id": "flexi",
    "n": "Flexi working desk",
    "cap": 12,
    "ic": "laptop",
    "v": 1,
    "d": "A desk of your own in a calm shared space, whenever you need it.",
    "feat": [
      "Up to 12 seats",
      "Reliable power and Wi-Fi",
      "Free drinking water",
      "Quiet working environment"
    ]
  },
  {
    "id": "meeting",
    "n": "Enclosed meeting room",
    "cap": 10,
    "ic": "door-closed",
    "v": 2,
    "tag": "3-in-1 private space",
    "d": "A fully enclosed, private space for meetings, interviews and focused team sessions.",
    "feat": [
      "Private and enclosed",
      "Stable power and fast Wi-Fi",
      "Air-conditioned",
      "Ideal for calls and client meetings"
    ]
  }
] as HubSpace[];

/** PLACEHOLDER: hub rates in NGN, to be confirmed by the Hub manager. */
export const HUB_PRICES: HubPriceTable = {
  "training": {
    "h": 10000,
    "d": 50000,
    "m": 700000,
    "y": 7500000
  },
  "flexi": {
    "d": 3500,
    "m": 40000,
    "y": 420000
  },
  "meeting": {
    "h": 5000,
    "d": 25000,
    "m": 350000,
    "y": 3800000
  }
};

export const HUB_PLANS: HubPlanInfo[] = [
  [
    "h",
    "Hourly",
    "hour",
    "Per-hour rate for short sessions and meetings."
  ],
  [
    "d",
    "Daily",
    "day",
    "Single-day access, ideal for one-off needs."
  ],
  [
    "m",
    "Monthly",
    "month",
    "Flexible monthly access for regular use."
  ],
  [
    "y",
    "Annually",
    "year",
    "Best value for a full year."
  ]
] as HubPlanInfo[];

export const HUB_AMENITIES: HubAmenity[] = [
  [
    "wifi",
    "Strong Wi-Fi",
    "Fast, reliable internet for calls, uploads and deep work."
  ],
  [
    "zap",
    "Uninterrupted power",
    "Backup power so outages never interrupt your day."
  ],
  [
    "wind",
    "Air conditioning",
    "A cool, comfortable space to work and learn."
  ],
  [
    "shield-check",
    "Security",
    "A secure environment for you and your equipment."
  ],
  [
    "car",
    "Parking",
    "Convenient parking for members and guests."
  ],
  [
    "glass-water",
    "Free drinking water",
    "Stay refreshed throughout the day."
  ],
  [
    "utensils",
    "Restaurants and cafes nearby",
    "Good food and coffee a short walk away."
  ],
  [
    "users",
    "Community of techies",
    "Meet other developers, designers, founders and freelancers."
  ]
] as HubAmenity[];

export const CONSULTATION_BUDGETS: string[] = [
  "Under NGN 100,000",
  "NGN 100,000 to 300,000",
  "NGN 300,000 to 700,000",
  "NGN 700,000 to 1,500,000",
  "Above NGN 1,500,000",
  "To be discussed"
];

export const HOME_VIDEOS: VideoTeaser[] = [
  {
    "id": "hub",
    "t": "Tour of the TFN Hub",
    "d": "Walk through the co-working space, training room and meeting rooms.",
    "ic": "map-pin",
    "scene": 0
  },
  {
    "id": "train",
    "t": "Inside our training sessions",
    "d": "See learners building projects, collaborating and growing.",
    "ic": "users",
    "scene": 1
  },
  {
    "id": "stories",
    "t": "Student highlights",
    "d": "Testimonials and milestones from our learners.",
    "ic": "quote",
    "person": 4
  }
];

export const CAREER_ROLES: CareerRole[] = [
  {
    "id": "r1",
    "t": "Programme Instructor: Frontend and Full-Stack",
    "dept": "Teaching",
    "type": "Full-time",
    "loc": "Awka, in person and hybrid",
    "sum": "Teach project-based web development and mentor learners from first lesson to capstone.",
    "resp": [
      "Deliver engaging, hands-on classes using the TFN curriculum.",
      "Review learner projects and give clear, constructive feedback.",
      "Keep content current with industry tools and practices."
    ],
    "req": [
      "Proven experience building web applications with React and Node.js.",
      "Clear communication and patience with beginners.",
      "Experience mentoring or teaching is an advantage."
    ]
  },
  {
    "id": "r2",
    "t": "Programme Instructor: Cloud, Security and Networking",
    "dept": "Teaching",
    "type": "Full-time",
    "loc": "Awka, in person and hybrid",
    "sum": "Guide learners through AWS, DevOps, cybersecurity and networking labs.",
    "resp": [
      "Teach and assess hands-on labs and capstone projects.",
      "Prepare learners for recognised industry certifications.",
      "Maintain safe, well-documented lab environments."
    ],
    "req": [
      "Relevant certification or equivalent experience (AWS, CompTIA or Cisco).",
      "Strong practical skills in cloud, security or networking.",
      "Ability to explain complex ideas simply."
    ]
  },
  {
    "id": "r3",
    "t": "Creative and Digital Marketing Instructor",
    "dept": "Teaching",
    "type": "Part-time",
    "loc": "Awka, in person and hybrid",
    "sum": "Teach design, video, social media and digital marketing through real campaigns.",
    "resp": [
      "Lead practical sessions in design, video or marketing.",
      "Guide learners to build professional portfolios.",
      "Share current industry trends and standards."
    ],
    "req": [
      "A portfolio of real client or campaign work.",
      "Confident with tools such as Adobe, Canva and Meta Ads.",
      "A passion for developing young talent."
    ]
  },
  {
    "id": "r4",
    "t": "Admissions and Student Support Officer",
    "dept": "Operations",
    "type": "Full-time",
    "loc": "Awka",
    "sum": "Be the first point of contact for applicants and support learners throughout their journey.",
    "resp": [
      "Respond to enquiries and guide applicants to the right programme.",
      "Coordinate onboarding and cohort communication.",
      "Keep accurate learner records."
    ],
    "req": [
      "Excellent written and verbal communication.",
      "Strong organisation and attention to detail.",
      "Comfortable with spreadsheets and CRM tools."
    ]
  },
  {
    "id": "r5",
    "t": "Hub Community Manager",
    "dept": "Hub",
    "type": "Full-time",
    "loc": "Awka",
    "sum": "Run the day-to-day experience of the TFN Hub and look after its members.",
    "resp": [
      "Welcome members and manage space bookings.",
      "Keep the hub running smoothly, from power and Wi-Fi to cleanliness.",
      "Organise community events and webinars."
    ],
    "req": [
      "Experience in hospitality, facilities or community management.",
      "Friendly, reliable and proactive.",
      "Basic knowledge of booking and payment tools."
    ]
  },
  {
    "id": "r6",
    "t": "Content and Social Media Executive",
    "dept": "Marketing",
    "type": "Full-time",
    "loc": "Awka or hybrid",
    "sum": "Tell the TFN Academy story across social media, the blog and video.",
    "resp": [
      "Plan and publish content across channels.",
      "Capture photos and video of classes, events and the hub.",
      "Report on engagement and growth."
    ],
    "req": [
      "Strong writing and visual storytelling skills.",
      "Experience with Canva, CapCut and scheduling tools.",
      "A creative eye and consistent delivery."
    ]
  },
  {
    "id": "r7",
    "t": "Industry Mentor",
    "dept": "Community",
    "type": "Volunteer",
    "loc": "Hybrid",
    "sum": "Share your experience with learners through talks, reviews and career guidance.",
    "resp": [
      "Host a guest session or review learner projects.",
      "Offer career advice and feedback.",
      "Help learners connect with industry opportunities."
    ],
    "req": [
      "Professional experience in tech, creative or business fields.",
      "A willingness to give back.",
      "Reliable and supportive."
    ]
  }
] as CareerRole[];

export const HUB_ADDRESS = "Office B31, 4th Floor, Awka Trade Centre Complex, Plot 71 Emeka Anyaoku Boulevard, Aroma Junction, 420110, Awka";

/** PLACEHOLDER: standard course fee in NGN, to be confirmed before launch. */
export const COURSE_FEE = 150000;

/** PLACEHOLDER: minutes a seat is held while payment is pending. */
export const PAY_WINDOW_MINUTES = 30;

/** PLACEHOLDER: bank transfer details, to be confirmed before launch. */
export const BANK_DETAILS: BankDetails = {
  "bank": "Bank name to be confirmed",
  "name": "TurboFlux Network Solutions Ltd",
  "no": "0000000000"
};

/** PLACEHOLDER: cohort WhatsApp invite link, to be confirmed before launch. */
export const WHATSAPP_COHORT_LINK = "https://chat.whatsapp.com/TFN-cohort-invite-link";

/** PLACEHOLDER: sample seats remaining per programme, for demo purposes only. */
export const SAMPLE_SEATS_LEFT: Record<string, number> = {
  "frontend": 14,
  "backend": 9,
  "fullstack": 12,
  "mobile": 7,
  "cloud": 18,
  "cyber": 11,
  "network": 16,
  "itsupport": 6,
  "data": 21,
  "ai": 13,
  "marketing": 10,
  "social": 19,
  "graphics": 8,
  "video": 15,
  "branding": 5,
  "business": 17,
  "product": 12,
  "project": 9,
  "va": 20
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    "id": "merit",
    "n": "Merit Excellence Award",
    "pct": 100,
    "ic": "award",
    "d": "For outstanding academic performers with a demonstrated passion for technology. Open to all Nigerians aged 18–30.",
    "req": [
      "CGPA of 3.5 or above",
      "Letter of motivation",
      "Two references"
    ],
    "ask": "Your CGPA, and the names and phone numbers of your two referees.",
    "fin": false,
    "rule": "age1830"
  },
  {
    "id": "community",
    "n": "Community Builder Grant",
    "pct": 50,
    "ic": "users",
    "d": "For candidates who show community leadership and a commitment to giving back to their local tech ecosystem after graduation.",
    "req": [
      "Evidence of a community project",
      "Interview"
    ],
    "ask": "Describe your community project and share a link or other proof.",
    "fin": false
  },
  {
    "id": "women",
    "n": "Women in Tech Scholarship",
    "pct": 60,
    "ic": "sparkles",
    "d": "For women entering the technology industry, especially from underrepresented states across Nigeria.",
    "req": [
      "Open to all women",
      "Letter of motivation"
    ],
    "ask": "Tell us what you hope to achieve in tech and why it matters to you.",
    "fin": false,
    "rule": "female"
  },
  {
    "id": "talent",
    "n": "Talent Discovery Bursary",
    "pct": 40,
    "ic": "zap",
    "d": "For candidates who show exceptional raw talent in our aptitude assessment but face financial constraints to enrol.",
    "req": [
      "Aptitude test score of 85% or above",
      "Evidence of financial need"
    ],
    "ask": "Describe the projects, skills or achievements that show your talent.",
    "fin": true
  },
  {
    "id": "young",
    "n": "Young Innovators Bursary",
    "pct": 50,
    "ic": "smile",
    "tag": "Kids & Teens",
    "d": "For children and teenagers with curiosity and creativity who want to join our holiday programmes but need financial support.",
    "req": [
      "Parent or guardian consent",
      "A short creative sample or school recommendation",
      "Evidence of financial need"
    ],
    "ask": "Tell us about something the young learner has made, built or imagined.",
    "fin": true,
    "rule": "minor"
  },
  {
    "id": "inclusion",
    "n": "Access & Inclusion Grant",
    "pct": 50,
    "ic": "heart",
    "d": "For learners living with a disability who need support to access training, so that talent is never held back by circumstance.",
    "req": [
      "Short statement of any support needed (optional details)",
      "Letter of motivation"
    ],
    "ask": "Share any support you would need to learn comfortably (optional) and why you want to join.",
    "fin": false
  },
  {
    "id": "switcher",
    "n": "Career Switcher Grant",
    "pct": 30,
    "ic": "compass",
    "d": "For working adults moving into tech, creative or business roles who want a structured path to a new career.",
    "req": [
      "Current role and career goal",
      "Letter of motivation",
      "One reference"
    ],
    "ask": "Your current role, the career you want to move into, and the name and phone number of one referee.",
    "fin": false
  }
] as Scholarship[];

export const SCHOLARSHIP_PERKS: [icon: string, label: string][] = [
  [
    "award",
    "Up to 100% tuition covered"
  ],
  [
    "hammer",
    "Real-world projects"
  ],
  [
    "users",
    "Career mentorship"
  ],
  [
    "badge-check",
    "Industry certificate"
  ],
  [
    "briefcase",
    "Job placement support"
  ]
];

export const SCHOLARSHIP_STEPS: StepTuple[] = [
  [
    "Choose a track",
    "Select the course you want to apply for."
  ],
  [
    "Fill in your application",
    "Complete the scholarship application form."
  ],
  [
    "Assessment",
    "Sit our online aptitude test. It takes about 45 minutes."
  ],
  [
    "Decision",
    "Receive your scholarship decision within 5 working days."
  ]
];

export const CORPORATE_AREAS: CorpItem[] = [
  [
    "laptop",
    "Digital Skills Training",
    "Foundational to advanced digital competencies for modern teams."
  ],
  [
    "shield-check",
    "Cybersecurity Awareness",
    "Human-layer security, your first and most critical defence."
  ],
  [
    "bot",
    "AI and Productivity",
    "Use AI tools to do more in less time, practically, not theoretically."
  ],
  [
    "rocket",
    "Technology Upskilling",
    "Keep your team ahead of the curve as the tech landscape shifts."
  ],
  [
    "bar-chart-3",
    "Data and Analytics for Teams",
    "Turn spreadsheets and reports into decisions people act on."
  ],
  [
    "folder-kanban",
    "Project and Product Management",
    "Plan, deliver and ship work on time with proven frameworks."
  ],
  [
    "megaphone",
    "Digital Marketing and Communications",
    "Grow brands, content and customer engagement across channels."
  ],
  [
    "cloud",
    "Cloud and IT Operations",
    "Equip IT teams to run reliable, secure infrastructure."
  ]
];

export const CORPORATE_FORMATS: CorpItem[] = [
  [
    "presentation",
    "Workshops",
    "Focused sessions on a single skill or tool, ideal for getting a team started quickly."
  ],
  [
    "zap",
    "Bootcamps",
    "Intensive, hands-on programmes that take a team from the basics to real project work."
  ],
  [
    "trending-up",
    "Ongoing upskilling",
    "Regular learning programmes that keep skills fresh as tools and threats change."
  ]
];

export const CORPORATE_FIT: CorpItem[] = [
  [
    "building-2",
    "Your industry",
    "Examples, case studies and scenarios drawn from your sector, from banking and education to government and healthcare."
  ],
  [
    "wrench",
    "Your tools",
    "Training on the platforms your team already uses, so new skills apply from the next working day."
  ],
  [
    "users",
    "Your team size",
    "Small groups or whole departments, with sessions and support scaled to fit."
  ]
];

export const CORPORATE_WHO: string[] = [
  "Banks and financial institutions",
  "Universities and schools",
  "Government agencies",
  "NGOs and development organisations",
  "Healthcare providers",
  "Growing businesses"
];

export const CORPORATE_STEPS: StepTuple[] = [
  [
    "Consultation",
    "Tell us about your organisation, goals and team."
  ],
  [
    "Needs assessment",
    "We identify the skills gaps and the tools your people use."
  ],
  [
    "Custom proposal",
    "You receive a tailored programme, format and plan."
  ],
  [
    "Delivery and follow-up",
    "On-site or online training, with a review of the results."
  ]
];

/** PLACEHOLDER: demo discount codes for the enrolment flow. */
export const PROMO_CODES: Record<string, PromoCode> = {
  "TFN10": {
    "pct": 10,
    "label": "10% off your course fee"
  },
  "EARLYBIRD": {
    "pct": 15,
    "label": "15% early-bird discount"
  },
  "WELCOME5000": {
    "flat": 5000,
    "label": "NGN 5,000 off your course fee"
  }
};

/** PLACEHOLDER: WhatsApp support number, to be confirmed before launch. */
export const WHATSAPP_SUPPORT_NUMBER = "2347120033922";

export const ODS: OpenDecision[] = [
  { id: 'OD-01', t: 'Gradient shades', d: 'The primary blue (#1F4FE0) and the orange are applied from your brief. The lighter blue, orange and dark-navy gradient ends are derived from them. Send exact hex codes if your guidelines specify them, or use the colour pickers in this panel.' },
  { id: 'OD-02', t: 'Student photography', d: 'Illustrated stand-ins are used until real TFN student photos are supplied. Hover any picture and choose “Replace photo” to preview your own.' },
  { id: 'OD-03', t: 'Programme content review', d: 'Business Development was rewritten, Product Management & Design was restored as its own programme, and eight new programmes were drafted. Existing programmes were revised and some retired certifications replaced. Please have subject experts review, and confirm each certification name and availability with its provider before launch.' },
  { id: 'OD-04', t: 'Fees and payment', d: 'One standard course fee (NGN 150,000) is used for every programme as a placeholder. The payment gateway is simulated. The discount codes (TFN10, EARLYBIRD, WELCOME5000) are demo codes. The bank account details, the 30-minute payment window and the WhatsApp community link are placeholders to be replaced.' },
  { id: 'OD-05', t: 'Sample content', d: 'Student stories, talent profiles, blog posts and certificate records are sample content for design review only. Replace with real, consented content before launch.' },
  { id: 'OD-06', t: 'Kids & Teens programmes', d: 'Holiday programme topics and the two age bands are drafted. Confirm programmes, ages, safeguarding policy and delivery format.' },
  { id: 'OD-07', t: 'Hire talent', d: 'Graduate profiles must appear only with each graduate’s written consent. Confirm the consultation and matching process and who responds to requests.' },
  { id: 'OD-08', t: 'Syllabus files', d: '“Download syllabus” currently generates a printable file from the curriculum on this site. Replace with designed PDFs when ready.' },
  { id: 'OD-09', t: 'Virtual learning', d: 'In-person and hybrid learning are live; online/virtual is shown as “coming soon”. Update when it launches.' },
  { id: 'OD-10', t: 'TFN Hub details', d: 'Prices are fair placeholder figures (NGN) to be replaced. The map pin is found from the address text, so please check it lands on the right building. Confirm the seat count and layout of the enclosed “3-in-1” meeting room, opening hours, and who confirms bookings and payment.' },
  { id: 'OD-11', t: 'Careers roles', d: 'The open roles, descriptions and hiring steps are sample content. Replace with real vacancies and confirm where applications are sent.' },
  { id: 'OD-13', t: 'Corporate training', d: 'The training areas, formats and process are drafted from your brief. Confirm the offering, whether online delivery is available now, and who responds to proposal requests.' },
  { id: 'OD-14', t: 'Scholarships', d: 'The first four scholarships follow your brief. Young Innovators Bursary, Access & Inclusion Grant and Career Switcher Grant are my additions with draft percentages and requirements. Confirm criteria, the aptitude test and the 5-day decision window. Seat numbers shown during enrolment are sample figures.' },
  { id: 'OD-12', t: 'Videos', d: 'Video slots are placeholders. Click play to load a video from your computer (kept for this session only). Send the files or links to build them in permanently.' },
];

export const FAQS: FaqItem[] = [
  ['Do I need any tech experience?', 'No. Beginner stages start from basic computer skills, and programmes such as Prompt Engineering & AI and Virtual Assistant only need you to be comfortable with a phone or computer. If you already have experience, you can start at an advanced stage.'],
  ['How do I apply, and what happens next?', 'Choose your programme and complete your details, then pay the standard course fee online or by bank transfer, or apply for a scholarship instead. After payment you can join your cohort’s WhatsApp community, and admissions shares your start date and onboarding details.'],
  ['Are classes in person or online?', 'Classes are in person and hybrid, based in Awka, Anambra State. Online and virtual learning is coming soon.', 'OD-09'],
  ['What do I need to take part?', 'A laptop that meets the minimum specification, a stable internet connection and a power backup. Each programme page lists its free tools, and the Admissions page has the full requirements.'],
  ['Will I get a certification?', 'Every programme prepares you for internationally recognised certifications. Exam booking is done after your training. Employers can confirm a TFN Academy certificate using our Verify certificate page.'],
  ['Can I join more than one programme?', 'Many learners start with one. If you want to combine two, tell admissions when you apply and they will help you plan it.'],
  ['Is there a minimum age?', 'No. Children and teenagers can join our holiday programmes, and admissions will guide every applicant to the right programme.'],
  ['How much does it cost?', 'Every programme has the same standard course fee, shown when you apply. You can pay online through our payment gateway or by bank transfer, and scholarships can cover part or all of it.', 'OD-04'],
];

export const STATES: string[] = [
  'Anambra', 'Lagos', 'Abuja (FCT)', 'Enugu', 'Imo', 'Abia', 'Ebonyi', 'Delta',
  'Edo', 'Rivers', 'Oyo', 'Ogun', 'Kano', 'Kaduna', 'Other state', 'Outside Nigeria',
];

export const NG_PHONE_REGEX = /^(\+234|234|0)[789][01]\d{8}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const ALL_CERTS: string[] = [...new Set(PROGRAMMES.flatMap((t) => t.certs))];

export const TRACKS = PROGRAMMES;
export const CATS = PROGRAMME_CATEGORIES;
export const FEATURED = FEATURED_PROGRAMME_SLUGS;
export const INTERESTS = FINDER_INTERESTS;
export const INT_MAP = FINDER_INTEREST_MAP;
export const TECH = FINDER_TECH_WEIGHT;
export const TECHQ = FINDER_TECH_QUESTIONS;
export const KIDS = KIDS_PROGRAMMES;
export const KID_AGES = KID_AGE_BANDS;
export const STORIES = STUDENT_STORIES;
export const TALENT = TALENT_PROFILES;
export const VERIFY = VERIFY_RECORDS;
export const BLOG = BLOG_POSTS;
export const BUDGETS = CONSULTATION_BUDGETS;
export const VIDS = HOME_VIDEOS;
export const CAREERS = CAREER_ROLES;
export const PAY_WINDOW_MIN = PAY_WINDOW_MINUTES;
export const BANK = BANK_DETAILS;
export const WHATSAPP_LINK = WHATSAPP_COHORT_LINK;
export const SEATS = SAMPLE_SEATS_LEFT;
export const SCHOLS = SCHOLARSHIPS;
export const SCHOL_PERKS = SCHOLARSHIP_PERKS;
export const SCHOL_STEPS = SCHOLARSHIP_STEPS;
export const CORP_AREAS = CORPORATE_AREAS.map(([ic, t, d]) => ({ ic, t, d }));
export const CORP_FORMATS = CORPORATE_FORMATS.map(([ic, t, d]) => ({ ic, t, d }));
export const CORP_FIT = CORPORATE_FIT.map(([ic, t, d]) => ({ ic, t, d }));
export const CORP_WHO = CORPORATE_WHO;
export const CORP_STEPS = CORPORATE_STEPS;
export const PROMOS = PROMO_CODES;
export const WA_NUMBER = WHATSAPP_SUPPORT_NUMBER;
export const findTrack = (slug: string) => PROGRAMMES.find((t) => t.slug === slug);
export const findCategory = (id: string) => PROGRAMME_CATEGORIES.find((c) => c.id === id);


