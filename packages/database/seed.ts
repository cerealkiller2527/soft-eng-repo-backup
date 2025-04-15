import { PrismaClient, RequestType, Status, Priority, nodeType } from './.prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete data in correct order to avoid foreign key conflicts.
  await prisma.audioVisual.deleteMany();
  await prisma.externalTransportation.deleteMany();
  await prisma.equipmentDelivery.deleteMany();
  await prisma.language.deleteMany();
  await prisma.security.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.edge.deleteMany();
  await prisma.departmentServices.deleteMany();
  await prisma.service.deleteMany();
  await prisma.department.deleteMany();
  await prisma.node.deleteMany();
  await prisma.building.deleteMany();
  await prisma.user.deleteMany();

  console.log("Existing data purged.");

  // Create admin user.
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin', // Plain text (not secure in production)
      email: 'admin@admin.com',
    }
  });
  console.log(`Created admin user: ${admin.username}`);

  // Create multiple building records.
  const buildingChestnut = await prisma.building.create({
    data: {
      name: "Brigham and Women's Health Care Center at Chestnut Hill",
      address: "850 Boylston Street, Chestnut Hill, MA 02467",
      phoneNumber: "1-800-BWH-9999",
    }
  });

  const buildingPatriot20 = await prisma.building.create({
    data: {
      name: "20 Patriot Place",
      address: "20 Patriot Place, Some City, State",
      phoneNumber: "123-456-7890",
    }
  });

  const buildingPatriot22 = await prisma.building.create({
    data: {
      name: "22 Patriot Place",
      address: "22 Patriot Place, Some City, State",
      phoneNumber: "123-456-7891",
    }
  });

  // -------------------------------------------------------------
  // Seed nodes (building layout and department locations)
  // For Chestnut Hill:
  await prisma.node.createMany({
    data: [
      // Generic layout nodes.
      {
        type: nodeType.Entrance,
        description: "Chestnut Hill Main Entrance",
        lat: 30,
        long: 30,
        suite: "",
        floor: 1,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Staircase,
        description: "Chestnut Hill Staircase",
        lat: 50,
        long: 50,
        suite: "",
        floor: 1,
        buildingId: buildingChestnut.id,
      },
      // Nodes for department locations (will be updated to link a department later).
      {
        type: nodeType.Location,
        description: "Dept Node (Allergy and Clinical Immunology)",
        lat: 120,
        long: 220,
        suite: "301",
        floor: 3,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Backup Child Care Center)",
        lat: 80,
        long: 180,
        suite: "210",
        floor: 2,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Brigham Dermatology Associates)",
        lat: 125,
        long: 225,
        suite: "317",
        floor: 3,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Brigham Obstetrics and Gynecology Group)",
        lat: 140,
        long: 240,
        suite: "575",
        floor: 5,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Brigham Physicians Group)",
        lat: 115,
        long: 215,
        suite: "428",
        floor: 4,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Brigham Psychiatric Specialties)",
        lat: 130,
        long: 230,
        suite: "303",
        floor: 3,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Center for Pain Medicine)",
        lat: 135,
        long: 235,
        suite: "320",
        floor: 3,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Crohn's and Colitis Center)",
        lat: 75,
        long: 175,
        suite: "201",
        floor: 2,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Endoscopy Center)",
        lat: 78,
        long: 178,
        suite: "202",
        floor: 2,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Fish Center for Women's Health)",
        lat: 145,
        long: 245,
        suite: "402",
        floor: 4,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Laboratory)",
        lat: 55,
        long: 55,
        suite: "100",
        floor: 1,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Multi-Specialty Clinic)",
        lat: 60,
        long: 60,
        suite: "130",
        floor: 1,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Osher Clinical Center for Integrative Health)",
        lat: 150,
        long: 250,
        suite: "422",
        floor: 4,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Patient Financial Services)",
        lat: 85,
        long: 185,
        suite: "204B",
        floor: 2,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Pharmacy)",
        lat: 122,
        long: 222,
        suite: "317",
        floor: 3,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Radiology)",
        lat: 160,
        long: 260,
        suite: "560",
        floor: 5,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Radiology, MRI/CT scan)",
        lat: 65,
        long: 65,
        suite: "102B",
        floor: 1,
        buildingId: buildingChestnut.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Rehabilitation Services)",
        lat: 90,
        long: 190,
        suite: "200",
        floor: 2,
        buildingId: buildingChestnut.id,
      },
    ]
  });

  // For Patriot Place – 20:
  await prisma.node.createMany({
    data: [
      {
        type: nodeType.Entrance,
        description: "Patriot Place 20 Entrance",
        lat: 100,
        long: 100,
        suite: "",
        floor: 1,
        buildingId: buildingPatriot20.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Patriot Physical Therapy)",
        lat: 110,
        long: 110,
        suite: "A101",
        floor: 1,
        buildingId: buildingPatriot20.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Patriot Radiology)",
        lat: 115,
        long: 115,
        suite: "A102",
        floor: 1,
        buildingId: buildingPatriot20.id,
      },
    ]
  });

  // For Patriot Place – 22:
  await prisma.node.createMany({
    data: [
      {
        type: nodeType.Entrance,
        description: "Patriot Place 22 Entrance",
        lat: 150,
        long: 150,
        suite: "",
        floor: 3,
        buildingId: buildingPatriot22.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Patriot Cardiology)",
        lat: 155,
        long: 155,
        suite: "B201",
        floor: 3,
        buildingId: buildingPatriot22.id,
      },
      {
        type: nodeType.Location,
        description: "Dept Node (Patriot Orthopedics)",
        lat: 160,
        long: 160,
        suite: "B202",
        floor: 4,
        buildingId: buildingPatriot22.id,
      },
    ]
  });

  // -------------------------------------------------------------
  // Department and Service Seeding
  // For Chestnut Hill we use real directory data.
  const chestnutDepartmentsData = [
    { name: 'Allergy and Clinical Immunology', description: 'Allergy, asthma, immunology services', phoneNumber: '(617) 732-9850', floor: 3, suite: '301' },
    { name: 'Backup Child Care Center', description: 'Childcare services for employees', phoneNumber: '(617) 732-9543', floor: 2, suite: '210' },
    { name: 'Brigham Dermatology Associates (BDA)', description: 'Medical and surgical dermatology', phoneNumber: '(617) 732-9080', floor: 3, suite: '317' },
    { name: 'Brigham Obstetrics and Gynecology Group (BOGG)', description: 'Gynecology and obstetrics', phoneNumber: '(617) 732-9100', floor: 5, suite: '575' },
    { name: 'Brigham Physicians Group (BPG)', description: 'Primary care for adults', phoneNumber: '(617) 732-9900', floor: 4, suite: '428' },
    { name: 'Brigham Psychiatric Specialties', description: 'Psychiatry, psychology, social work', phoneNumber: '(617) 732-9811', floor: 3, suite: '303' },
    { name: 'Center for Pain Medicine', description: 'Multidisciplinary pain management', phoneNumber: '(617) 732-9060', floor: 3, suite: '320' },
    { name: "Crohn's and Colitis Center", description: "Crohn's disease and IBD services", phoneNumber: '(617) 732-6389', floor: 2, suite: '201' },
    { name: 'Endoscopy Center', description: 'Endoscopic procedures', phoneNumber: '(617) 732-7426', floor: 2, suite: '202' },
    { name: "Gretchen S. and Edward A. Fish Center for Women's Health", description: "Women's health services", phoneNumber: '(617) 732-9300', floor: 4, suite: '402' },
    { name: "Laboratory", description: "Clinical laboratory services", phoneNumber: '(617) 732-9841', floor: 1, suite: '100' },
    { name: "Multi-Specialty Clinic", description: "Various medical specialties", phoneNumber: '(617) 732-9500', floor: 1, suite: '130' },
    { name: "Osher Clinical Center for Integrative Health", description: "Integrative medicine and health coaching", phoneNumber: '(617) 732-9700', floor: 4, suite: '422' },
    { name: "Patient Financial Services", description: "Financial counseling for patients", phoneNumber: '(617) 732-9677', floor: 2, suite: '204B' },
    { name: "Pharmacy", description: "Outpatient pharmacy services", phoneNumber: '(617) 732-9040', floor: 3, suite: '317' },
    { name: "Radiology", description: "Diagnostic imaging services", phoneNumber: '(617) 732-9801', floor: 5, suite: '560' },
    { name: "Radiology, MRI/CT scan", description: "Advanced imaging services: CT, MRI, X-Ray", phoneNumber: '(617) 732-9821', floor: 1, suite: '102B' },
    { name: "Rehabilitation Services", description: "Physical therapy and rehabilitation", phoneNumber: '(617) 732-9525', floor: 2, suite: '200' },
  ];

  const chestnutDepartments = await Promise.all(
    chestnutDepartmentsData.map(dept =>
      prisma.department.create({
        data: {
          name: dept.name,
          description: dept.description,
          phoneNumber: dept.phoneNumber,
          buildingID: buildingChestnut.id,
        }
      })
    )
  );

  // Link Chestnut Hill department nodes to departments.
  await Promise.all(
    chestnutDepartments.map(async (dept) => {
      const rawDept = chestnutDepartmentsData.find(d => d.name === dept.name && d.phoneNumber === dept.phoneNumber);
      if (rawDept) {
        const result = await prisma.node.updateMany({
          where: {
            buildingId: buildingChestnut.id,
            floor: rawDept.floor,
            suite: rawDept.suite,
          },
          data: { departmentId: dept.id },
        });
        if (result.count === 0) {
          console.warn(`No node found for ${dept.name} at floor ${rawDept.floor}, suite ${rawDept.suite}`);
        }
      }
    })
  );

  // Create services for Chestnut Hill departments.
  const chestnutServices = await Promise.all(
    chestnutDepartmentsData.map(dept =>
      prisma.service.create({
        data: {
          name: dept.description || dept.name,
        }
      })
    )
  );

  // Link departments with services via DepartmentServices.
  const chestnutDeptServiceLinks = chestnutDepartments.map((dept, i) => ({
    departmentID: dept.id,
    serviceID: chestnutServices[i].id,
  }));
  await prisma.departmentServices.createMany({
    data: chestnutDeptServiceLinks,
    skipDuplicates: true,
  });

  // For Patriot Place 20 – use dummy department data.
  const patriot20DepartmentsData = [
    { name: 'Patriot Physical Therapy', description: 'Physical therapy services', phoneNumber: '111-111-1111', floor: 1, suite: 'A101' },
    { name: 'Patriot Radiology', description: 'Radiology services', phoneNumber: '111-111-1112', floor: 1, suite: 'A102' },
  ];

  const patriot20Departments = await Promise.all(
    patriot20DepartmentsData.map(dept =>
      prisma.department.create({
        data: {
          name: dept.name,
          description: dept.description,
          phoneNumber: dept.phoneNumber,
          buildingID: buildingPatriot20.id,
        }
      })
    )
  );

  await Promise.all(
    patriot20Departments.map(async (dept, i) => {
      const rawDept = patriot20DepartmentsData[i];
      const result = await prisma.node.updateMany({
        where: {
          buildingId: buildingPatriot20.id,
          floor: rawDept.floor,
          suite: rawDept.suite,
        },
        data: { departmentId: dept.id },
      });
      if (result.count === 0) {
        console.warn(`No node found for ${dept.name} at floor ${rawDept.floor}, suite ${rawDept.suite}`);
      }
    })
  );

  const patriot20Services = await Promise.all(
    patriot20DepartmentsData.map(dept =>
      prisma.service.create({
        data: { name: dept.description || dept.name },
      })
    )
  );
  const patriot20DeptServiceLinks = patriot20Departments.map((dept, i) => ({
    departmentID: dept.id,
    serviceID: patriot20Services[i].id,
  }));
  await prisma.departmentServices.createMany({
    data: patriot20DeptServiceLinks,
    skipDuplicates: true,
  });

  // For Patriot Place 22 – dummy department data.
  const patriot22DepartmentsData = [
    { name: 'Patriot Cardiology', description: 'Cardiology services', phoneNumber: '222-222-2221', floor: 3, suite: 'B201' },
    { name: 'Patriot Orthopedics', description: 'Orthopedic services', phoneNumber: '222-222-2222', floor: 4, suite: 'B202' },
  ];

  const patriot22Departments = await Promise.all(
    patriot22DepartmentsData.map(dept =>
      prisma.department.create({
        data: {
          name: dept.name,
          description: dept.description,
          phoneNumber: dept.phoneNumber,
          buildingID: buildingPatriot22.id,
        }
      })
    )
  );

  await Promise.all(
    patriot22Departments.map(async (dept, i) => {
      const rawDept = patriot22DepartmentsData[i];
      const result = await prisma.node.updateMany({
        where: {
          buildingId: buildingPatriot22.id,
          floor: rawDept.floor,
          suite: rawDept.suite,
        },
        data: { departmentId: dept.id },
      });
      if (result.count === 0) {
        console.warn(`No node found for ${dept.name} at floor ${rawDept.floor}, suite ${rawDept.suite}`);
      }
    })
  );

  const patriot22Services = await Promise.all(
    patriot22DepartmentsData.map(dept =>
      prisma.service.create({
        data: { name: dept.description || dept.name },
      })
    )
  );
  const patriot22DeptServiceLinks = patriot22Departments.map((dept, i) => ({
    departmentID: dept.id,
    serviceID: patriot22Services[i].id,
  }));
  await prisma.departmentServices.createMany({
    data: patriot22DeptServiceLinks,
    skipDuplicates: true,
  });

  // -------------------------------------------------------------
  // Create sample employees and external transportation requests.
  const employees = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.employee.create({
        data: {
          name: `Transport Employee ${i + 1}`,
          employeeType: 'Transport',
          canService: [RequestType.EXTERNALTRANSPORTATION],
          language: ['English'],
        }
      })
    )
  );

  // Create a few external transportation service requests for Chestnut Hill.
  await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      const request = await prisma.serviceRequest.create({
        data: {
          type: RequestType.EXTERNALTRANSPORTATION,
          status: i < 3 ? Status.ASSIGNED : Status.NOTASSIGNED,
          description: `Transport request ${i + 1} for Chestnut Hill`,
          assignedEmployeeID: i < 3 ? employees[i % employees.length].id : null,
          fromEmployee: `Employee ${i + 1}`,
          priority: Priority.Medium,
        },
      });
      await prisma.externalTransportation.create({
        data: {
          id: request.id,
          fromWhere: `CH Location A${i}`,
          toWhere: `CH Location B${i}`,
          transportType: 'Wheelchair Van',
          patientName: `Patient ${i + 1}`,
          pickupTime: new Date(Date.now() + 1000 * 60 * (i + 1) * 30),
        },
      });
    })
  );

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
