import { z } from 'zod';
import type { Prisma } from '../../../.prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const EmployeeScalarFieldEnumSchema = z.enum(['id','email','username','role','firstName','lastName','title','canService','language']);

export const ServiceRequestScalarFieldEnumSchema = z.enum(['id','type','dateCreated','dateUpdated','status','description','assignedEmployeeID','fromEmployee','priority']);

export const AudioVisualScalarFieldEnumSchema = z.enum(['id','location','deadline','audiovisualType']);

export const ExternalTransportationScalarFieldEnumSchema = z.enum(['id','fromWhere','toWhere','transportType','patientName','pickupTime']);

export const EquipmentDeliveryScalarFieldEnumSchema = z.enum(['id','deadline','equipments','toWhere']);

export const LanguageScalarFieldEnumSchema = z.enum(['id','location','language','startTime','endTime']);

export const SecurityScalarFieldEnumSchema = z.enum(['id','location']);

export const EdgeScalarFieldEnumSchema = z.enum(['id','fromNodeId','toNodeId']);

export const NodeScalarFieldEnumSchema = z.enum(['id','type','description','lat','long','outside']);

export const LocationScalarFieldEnumSchema = z.enum(['id','floor','suite','buildingId','departmentId','nodeID']);

export const DepartmentScalarFieldEnumSchema = z.enum(['id','name','description','phoneNumber']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','name']);

export const DepartmentServicesScalarFieldEnumSchema = z.enum(['departmentID','serviceID']);

export const BuildingScalarFieldEnumSchema = z.enum(['id','name','address','phoneNumber']);

export const SearchAlgorithmScalarFieldEnumSchema = z.enum(['id','current']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const StatusSchema = z.enum(['NOTASSIGNED','ASSIGNED','INPROGRESS','COMPLETED']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export const RequestTypeSchema = z.enum(['AUDIOVISUAL','EXTERNALTRANSPORTATION','EQUIPMENTDELIVERY','LANGUAGE','SECURITY']);

export type RequestTypeType = `${z.infer<typeof RequestTypeSchema>}`

export const PrioritySchema = z.enum(['Low','Medium','High','Emergency']);

export type PriorityType = `${z.infer<typeof PrioritySchema>}`

export const nodeTypeSchema = z.enum(['Entrance','Intermediary','Staircase','Elevator','Location','Help_Desk','Parking']);

export type nodeTypeType = `${z.infer<typeof nodeTypeSchema>}`

export const AlgorithmSchema = z.enum(['BFS','DFS']);

export type AlgorithmType = `${z.infer<typeof AlgorithmSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EMPLOYEE SCHEMA
/////////////////////////////////////////

export const EmployeeSchema = z.object({
  canService: RequestTypeSchema.array(),
  id: z.number().int(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  language: z.string().array(),
})

export type Employee = z.infer<typeof EmployeeSchema>

/////////////////////////////////////////
// SERVICE REQUEST SCHEMA
/////////////////////////////////////////

export const ServiceRequestSchema = z.object({
  type: RequestTypeSchema,
  status: StatusSchema,
  priority: PrioritySchema,
  id: z.number().int(),
  dateCreated: z.coerce.date(),
  dateUpdated: z.coerce.date().nullable(),
  description: z.string(),
  assignedEmployeeID: z.number().int().nullable(),
  fromEmployee: z.string(),
})

export type ServiceRequest = z.infer<typeof ServiceRequestSchema>

/////////////////////////////////////////
// AUDIO VISUAL SCHEMA
/////////////////////////////////////////

export const AudioVisualSchema = z.object({
  id: z.number().int(),
  location: z.string(),
  deadline: z.coerce.date(),
  audiovisualType: z.string(),
})

export type AudioVisual = z.infer<typeof AudioVisualSchema>

/////////////////////////////////////////
// EXTERNAL TRANSPORTATION SCHEMA
/////////////////////////////////////////

export const ExternalTransportationSchema = z.object({
  id: z.number().int(),
  fromWhere: z.string(),
  toWhere: z.string(),
  transportType: z.string(),
  patientName: z.string(),
  pickupTime: z.coerce.date(),
})

export type ExternalTransportation = z.infer<typeof ExternalTransportationSchema>

/////////////////////////////////////////
// EQUIPMENT DELIVERY SCHEMA
/////////////////////////////////////////

export const EquipmentDeliverySchema = z.object({
  id: z.number().int(),
  deadline: z.coerce.date(),
  equipments: z.string().array(),
  toWhere: z.string(),
})

export type EquipmentDelivery = z.infer<typeof EquipmentDeliverySchema>

/////////////////////////////////////////
// LANGUAGE SCHEMA
/////////////////////////////////////////

export const LanguageSchema = z.object({
  id: z.number().int(),
  location: z.string(),
  language: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
})

export type Language = z.infer<typeof LanguageSchema>

/////////////////////////////////////////
// SECURITY SCHEMA
/////////////////////////////////////////

export const SecuritySchema = z.object({
  id: z.number().int(),
  location: z.string(),
})

export type Security = z.infer<typeof SecuritySchema>

/////////////////////////////////////////
// EDGE SCHEMA
/////////////////////////////////////////

export const EdgeSchema = z.object({
  id: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int(),
})

export type Edge = z.infer<typeof EdgeSchema>

/////////////////////////////////////////
// NODE SCHEMA
/////////////////////////////////////////

export const NodeSchema = z.object({
  type: nodeTypeSchema,
  id: z.number().int(),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
})

export type Node = z.infer<typeof NodeSchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.number().int(),
  floor: z.number().int(),
  suite: z.string().nullable(),
  buildingId: z.number().int(),
  departmentId: z.number().int().nullable(),
  nodeID: z.number().int().nullable(),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// DEPARTMENT SCHEMA
/////////////////////////////////////////

export const DepartmentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  phoneNumber: z.string(),
})

export type Department = z.infer<typeof DepartmentSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// DEPARTMENT SERVICES SCHEMA
/////////////////////////////////////////

export const DepartmentServicesSchema = z.object({
  departmentID: z.number().int(),
  serviceID: z.number().int(),
})

export type DepartmentServices = z.infer<typeof DepartmentServicesSchema>

/////////////////////////////////////////
// BUILDING SCHEMA
/////////////////////////////////////////

export const BuildingSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})

export type Building = z.infer<typeof BuildingSchema>

/////////////////////////////////////////
// SEARCH ALGORITHM SCHEMA
/////////////////////////////////////////

export const SearchAlgorithmSchema = z.object({
  current: AlgorithmSchema,
  id: z.number().int(),
})

export type SearchAlgorithm = z.infer<typeof SearchAlgorithmSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// EMPLOYEE
//------------------------------------------------------

export const EmployeeIncludeSchema: z.ZodType<Prisma.EmployeeInclude> = z.object({
  ServiceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmployeeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EmployeeArgsSchema: z.ZodType<Prisma.EmployeeDefaultArgs> = z.object({
  select: z.lazy(() => EmployeeSelectSchema).optional(),
  include: z.lazy(() => EmployeeIncludeSchema).optional(),
}).strict();

export const EmployeeCountOutputTypeArgsSchema: z.ZodType<Prisma.EmployeeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmployeeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EmployeeCountOutputTypeSelectSchema: z.ZodType<Prisma.EmployeeCountOutputTypeSelect> = z.object({
  ServiceRequest: z.boolean().optional(),
}).strict();

export const EmployeeSelectSchema: z.ZodType<Prisma.EmployeeSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  role: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  title: z.boolean().optional(),
  canService: z.boolean().optional(),
  language: z.boolean().optional(),
  ServiceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmployeeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE REQUEST
//------------------------------------------------------

export const ServiceRequestIncludeSchema: z.ZodType<Prisma.ServiceRequestInclude> = z.object({
  assignedTo: z.union([z.boolean(),z.lazy(() => EmployeeArgsSchema)]).optional(),
  audioVisual: z.union([z.boolean(),z.lazy(() => AudioVisualArgsSchema)]).optional(),
  externalTransportation: z.union([z.boolean(),z.lazy(() => ExternalTransportationArgsSchema)]).optional(),
  equipmentDelivery: z.union([z.boolean(),z.lazy(() => EquipmentDeliveryArgsSchema)]).optional(),
  language: z.union([z.boolean(),z.lazy(() => LanguageArgsSchema)]).optional(),
  security: z.union([z.boolean(),z.lazy(() => SecurityArgsSchema)]).optional(),
}).strict()

export const ServiceRequestArgsSchema: z.ZodType<Prisma.ServiceRequestDefaultArgs> = z.object({
  select: z.lazy(() => ServiceRequestSelectSchema).optional(),
  include: z.lazy(() => ServiceRequestIncludeSchema).optional(),
}).strict();

export const ServiceRequestSelectSchema: z.ZodType<Prisma.ServiceRequestSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  dateCreated: z.boolean().optional(),
  dateUpdated: z.boolean().optional(),
  status: z.boolean().optional(),
  description: z.boolean().optional(),
  assignedEmployeeID: z.boolean().optional(),
  fromEmployee: z.boolean().optional(),
  priority: z.boolean().optional(),
  assignedTo: z.union([z.boolean(),z.lazy(() => EmployeeArgsSchema)]).optional(),
  audioVisual: z.union([z.boolean(),z.lazy(() => AudioVisualArgsSchema)]).optional(),
  externalTransportation: z.union([z.boolean(),z.lazy(() => ExternalTransportationArgsSchema)]).optional(),
  equipmentDelivery: z.union([z.boolean(),z.lazy(() => EquipmentDeliveryArgsSchema)]).optional(),
  language: z.union([z.boolean(),z.lazy(() => LanguageArgsSchema)]).optional(),
  security: z.union([z.boolean(),z.lazy(() => SecurityArgsSchema)]).optional(),
}).strict()

// AUDIO VISUAL
//------------------------------------------------------

export const AudioVisualIncludeSchema: z.ZodType<Prisma.AudioVisualInclude> = z.object({
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

export const AudioVisualArgsSchema: z.ZodType<Prisma.AudioVisualDefaultArgs> = z.object({
  select: z.lazy(() => AudioVisualSelectSchema).optional(),
  include: z.lazy(() => AudioVisualIncludeSchema).optional(),
}).strict();

export const AudioVisualSelectSchema: z.ZodType<Prisma.AudioVisualSelect> = z.object({
  id: z.boolean().optional(),
  location: z.boolean().optional(),
  deadline: z.boolean().optional(),
  audiovisualType: z.boolean().optional(),
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

// EXTERNAL TRANSPORTATION
//------------------------------------------------------

export const ExternalTransportationIncludeSchema: z.ZodType<Prisma.ExternalTransportationInclude> = z.object({
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

export const ExternalTransportationArgsSchema: z.ZodType<Prisma.ExternalTransportationDefaultArgs> = z.object({
  select: z.lazy(() => ExternalTransportationSelectSchema).optional(),
  include: z.lazy(() => ExternalTransportationIncludeSchema).optional(),
}).strict();

export const ExternalTransportationSelectSchema: z.ZodType<Prisma.ExternalTransportationSelect> = z.object({
  id: z.boolean().optional(),
  fromWhere: z.boolean().optional(),
  toWhere: z.boolean().optional(),
  transportType: z.boolean().optional(),
  patientName: z.boolean().optional(),
  pickupTime: z.boolean().optional(),
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

// EQUIPMENT DELIVERY
//------------------------------------------------------

export const EquipmentDeliveryIncludeSchema: z.ZodType<Prisma.EquipmentDeliveryInclude> = z.object({
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

export const EquipmentDeliveryArgsSchema: z.ZodType<Prisma.EquipmentDeliveryDefaultArgs> = z.object({
  select: z.lazy(() => EquipmentDeliverySelectSchema).optional(),
  include: z.lazy(() => EquipmentDeliveryIncludeSchema).optional(),
}).strict();

export const EquipmentDeliverySelectSchema: z.ZodType<Prisma.EquipmentDeliverySelect> = z.object({
  id: z.boolean().optional(),
  deadline: z.boolean().optional(),
  equipments: z.boolean().optional(),
  toWhere: z.boolean().optional(),
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

// LANGUAGE
//------------------------------------------------------

export const LanguageIncludeSchema: z.ZodType<Prisma.LanguageInclude> = z.object({
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

export const LanguageArgsSchema: z.ZodType<Prisma.LanguageDefaultArgs> = z.object({
  select: z.lazy(() => LanguageSelectSchema).optional(),
  include: z.lazy(() => LanguageIncludeSchema).optional(),
}).strict();

export const LanguageSelectSchema: z.ZodType<Prisma.LanguageSelect> = z.object({
  id: z.boolean().optional(),
  location: z.boolean().optional(),
  language: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

// SECURITY
//------------------------------------------------------

export const SecurityIncludeSchema: z.ZodType<Prisma.SecurityInclude> = z.object({
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

export const SecurityArgsSchema: z.ZodType<Prisma.SecurityDefaultArgs> = z.object({
  select: z.lazy(() => SecuritySelectSchema).optional(),
  include: z.lazy(() => SecurityIncludeSchema).optional(),
}).strict();

export const SecuritySelectSchema: z.ZodType<Prisma.SecuritySelect> = z.object({
  id: z.boolean().optional(),
  location: z.boolean().optional(),
  serviceRequest: z.union([z.boolean(),z.lazy(() => ServiceRequestArgsSchema)]).optional(),
}).strict()

// EDGE
//------------------------------------------------------

export const EdgeIncludeSchema: z.ZodType<Prisma.EdgeInclude> = z.object({
  fromNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  toNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

export const EdgeArgsSchema: z.ZodType<Prisma.EdgeDefaultArgs> = z.object({
  select: z.lazy(() => EdgeSelectSchema).optional(),
  include: z.lazy(() => EdgeIncludeSchema).optional(),
}).strict();

export const EdgeSelectSchema: z.ZodType<Prisma.EdgeSelect> = z.object({
  id: z.boolean().optional(),
  fromNodeId: z.boolean().optional(),
  toNodeId: z.boolean().optional(),
  fromNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  toNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

// NODE
//------------------------------------------------------

export const NodeIncludeSchema: z.ZodType<Prisma.NodeInclude> = z.object({
  fromEdge: z.union([z.boolean(),z.lazy(() => EdgeFindManyArgsSchema)]).optional(),
  toEdge: z.union([z.boolean(),z.lazy(() => EdgeFindManyArgsSchema)]).optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NodeArgsSchema: z.ZodType<Prisma.NodeDefaultArgs> = z.object({
  select: z.lazy(() => NodeSelectSchema).optional(),
  include: z.lazy(() => NodeIncludeSchema).optional(),
}).strict();

export const NodeCountOutputTypeArgsSchema: z.ZodType<Prisma.NodeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NodeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NodeCountOutputTypeSelectSchema: z.ZodType<Prisma.NodeCountOutputTypeSelect> = z.object({
  fromEdge: z.boolean().optional(),
  toEdge: z.boolean().optional(),
  Location: z.boolean().optional(),
}).strict();

export const NodeSelectSchema: z.ZodType<Prisma.NodeSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  description: z.boolean().optional(),
  lat: z.boolean().optional(),
  long: z.boolean().optional(),
  outside: z.boolean().optional(),
  fromEdge: z.union([z.boolean(),z.lazy(() => EdgeFindManyArgsSchema)]).optional(),
  toEdge: z.union([z.boolean(),z.lazy(() => EdgeFindManyArgsSchema)]).optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  building: z.union([z.boolean(),z.lazy(() => BuildingArgsSchema)]).optional(),
  Department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationDefaultArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  floor: z.boolean().optional(),
  suite: z.boolean().optional(),
  buildingId: z.boolean().optional(),
  departmentId: z.boolean().optional(),
  nodeID: z.boolean().optional(),
  building: z.union([z.boolean(),z.lazy(() => BuildingArgsSchema)]).optional(),
  Department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

// DEPARTMENT
//------------------------------------------------------

export const DepartmentIncludeSchema: z.ZodType<Prisma.DepartmentInclude> = z.object({
  DepartmentServices: z.union([z.boolean(),z.lazy(() => DepartmentServicesFindManyArgsSchema)]).optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DepartmentArgsSchema: z.ZodType<Prisma.DepartmentDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentSelectSchema).optional(),
  include: z.lazy(() => DepartmentIncludeSchema).optional(),
}).strict();

export const DepartmentCountOutputTypeArgsSchema: z.ZodType<Prisma.DepartmentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DepartmentCountOutputTypeSelectSchema: z.ZodType<Prisma.DepartmentCountOutputTypeSelect> = z.object({
  DepartmentServices: z.boolean().optional(),
  Location: z.boolean().optional(),
}).strict();

export const DepartmentSelectSchema: z.ZodType<Prisma.DepartmentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  DepartmentServices: z.union([z.boolean(),z.lazy(() => DepartmentServicesFindManyArgsSchema)]).optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceIncludeSchema: z.ZodType<Prisma.ServiceInclude> = z.object({
  DepartmentServices: z.union([z.boolean(),z.lazy(() => DepartmentServicesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ServiceArgsSchema: z.ZodType<Prisma.ServiceDefaultArgs> = z.object({
  select: z.lazy(() => ServiceSelectSchema).optional(),
  include: z.lazy(() => ServiceIncludeSchema).optional(),
}).strict();

export const ServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ServiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ServiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ServiceCountOutputTypeSelect> = z.object({
  DepartmentServices: z.boolean().optional(),
}).strict();

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  DepartmentServices: z.union([z.boolean(),z.lazy(() => DepartmentServicesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEPARTMENT SERVICES
//------------------------------------------------------

export const DepartmentServicesIncludeSchema: z.ZodType<Prisma.DepartmentServicesInclude> = z.object({
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

export const DepartmentServicesArgsSchema: z.ZodType<Prisma.DepartmentServicesDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentServicesSelectSchema).optional(),
  include: z.lazy(() => DepartmentServicesIncludeSchema).optional(),
}).strict();

export const DepartmentServicesSelectSchema: z.ZodType<Prisma.DepartmentServicesSelect> = z.object({
  departmentID: z.boolean().optional(),
  serviceID: z.boolean().optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

// BUILDING
//------------------------------------------------------

export const BuildingIncludeSchema: z.ZodType<Prisma.BuildingInclude> = z.object({
  Location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BuildingCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BuildingArgsSchema: z.ZodType<Prisma.BuildingDefaultArgs> = z.object({
  select: z.lazy(() => BuildingSelectSchema).optional(),
  include: z.lazy(() => BuildingIncludeSchema).optional(),
}).strict();

export const BuildingCountOutputTypeArgsSchema: z.ZodType<Prisma.BuildingCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BuildingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BuildingCountOutputTypeSelectSchema: z.ZodType<Prisma.BuildingCountOutputTypeSelect> = z.object({
  Location: z.boolean().optional(),
}).strict();

export const BuildingSelectSchema: z.ZodType<Prisma.BuildingSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BuildingCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SEARCH ALGORITHM
//------------------------------------------------------

export const SearchAlgorithmSelectSchema: z.ZodType<Prisma.SearchAlgorithmSelect> = z.object({
  id: z.boolean().optional(),
  current: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const EmployeeWhereInputSchema: z.ZodType<Prisma.EmployeeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  canService: z.lazy(() => EnumRequestTypeNullableListFilterSchema).optional(),
  language: z.lazy(() => StringNullableListFilterSchema).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestListRelationFilterSchema).optional()
}).strict();

export const EmployeeOrderByWithRelationInputSchema: z.ZodType<Prisma.EmployeeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  canService: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EmployeeWhereUniqueInputSchema: z.ZodType<Prisma.EmployeeWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  canService: z.lazy(() => EnumRequestTypeNullableListFilterSchema).optional(),
  language: z.lazy(() => StringNullableListFilterSchema).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestListRelationFilterSchema).optional()
}).strict());

export const EmployeeOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmployeeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  canService: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmployeeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EmployeeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmployeeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmployeeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EmployeeSumOrderByAggregateInputSchema).optional()
}).strict();

export const EmployeeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmployeeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema),z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema),z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  canService: z.lazy(() => EnumRequestTypeNullableListFilterSchema).optional(),
  language: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const ServiceRequestWhereInputSchema: z.ZodType<Prisma.ServiceRequestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceRequestWhereInputSchema),z.lazy(() => ServiceRequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceRequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceRequestWhereInputSchema),z.lazy(() => ServiceRequestWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumRequestTypeFilterSchema),z.lazy(() => RequestTypeSchema) ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dateUpdated: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedEmployeeID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  fromEmployee: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => EmployeeNullableScalarRelationFilterSchema),z.lazy(() => EmployeeWhereInputSchema) ]).optional().nullable(),
  audioVisual: z.union([ z.lazy(() => AudioVisualNullableScalarRelationFilterSchema),z.lazy(() => AudioVisualWhereInputSchema) ]).optional().nullable(),
  externalTransportation: z.union([ z.lazy(() => ExternalTransportationNullableScalarRelationFilterSchema),z.lazy(() => ExternalTransportationWhereInputSchema) ]).optional().nullable(),
  equipmentDelivery: z.union([ z.lazy(() => EquipmentDeliveryNullableScalarRelationFilterSchema),z.lazy(() => EquipmentDeliveryWhereInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageNullableScalarRelationFilterSchema),z.lazy(() => LanguageWhereInputSchema) ]).optional().nullable(),
  security: z.union([ z.lazy(() => SecurityNullableScalarRelationFilterSchema),z.lazy(() => SecurityWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceRequestOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceRequestOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  dateUpdated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromEmployee: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => EmployeeOrderByWithRelationInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualOrderByWithRelationInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationOrderByWithRelationInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryOrderByWithRelationInputSchema).optional(),
  language: z.lazy(() => LanguageOrderByWithRelationInputSchema).optional(),
  security: z.lazy(() => SecurityOrderByWithRelationInputSchema).optional()
}).strict();

export const ServiceRequestWhereUniqueInputSchema: z.ZodType<Prisma.ServiceRequestWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ServiceRequestWhereInputSchema),z.lazy(() => ServiceRequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceRequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceRequestWhereInputSchema),z.lazy(() => ServiceRequestWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumRequestTypeFilterSchema),z.lazy(() => RequestTypeSchema) ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dateUpdated: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedEmployeeID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  fromEmployee: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => EmployeeNullableScalarRelationFilterSchema),z.lazy(() => EmployeeWhereInputSchema) ]).optional().nullable(),
  audioVisual: z.union([ z.lazy(() => AudioVisualNullableScalarRelationFilterSchema),z.lazy(() => AudioVisualWhereInputSchema) ]).optional().nullable(),
  externalTransportation: z.union([ z.lazy(() => ExternalTransportationNullableScalarRelationFilterSchema),z.lazy(() => ExternalTransportationWhereInputSchema) ]).optional().nullable(),
  equipmentDelivery: z.union([ z.lazy(() => EquipmentDeliveryNullableScalarRelationFilterSchema),z.lazy(() => EquipmentDeliveryWhereInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageNullableScalarRelationFilterSchema),z.lazy(() => LanguageWhereInputSchema) ]).optional().nullable(),
  security: z.union([ z.lazy(() => SecurityNullableScalarRelationFilterSchema),z.lazy(() => SecurityWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ServiceRequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceRequestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  dateUpdated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromEmployee: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceRequestCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceRequestAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceRequestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceRequestMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceRequestSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceRequestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceRequestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumRequestTypeWithAggregatesFilterSchema),z.lazy(() => RequestTypeSchema) ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  dateUpdated: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedEmployeeID: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  fromEmployee: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityWithAggregatesFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
}).strict();

export const AudioVisualWhereInputSchema: z.ZodType<Prisma.AudioVisualWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AudioVisualWhereInputSchema),z.lazy(() => AudioVisualWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AudioVisualWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AudioVisualWhereInputSchema),z.lazy(() => AudioVisualWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  audiovisualType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict();

export const AudioVisualOrderByWithRelationInputSchema: z.ZodType<Prisma.AudioVisualOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  audiovisualType: z.lazy(() => SortOrderSchema).optional(),
  serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputSchema).optional()
}).strict();

export const AudioVisualWhereUniqueInputSchema: z.ZodType<Prisma.AudioVisualWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AudioVisualWhereInputSchema),z.lazy(() => AudioVisualWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AudioVisualWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AudioVisualWhereInputSchema),z.lazy(() => AudioVisualWhereInputSchema).array() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  audiovisualType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict());

export const AudioVisualOrderByWithAggregationInputSchema: z.ZodType<Prisma.AudioVisualOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  audiovisualType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AudioVisualCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AudioVisualAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AudioVisualMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AudioVisualMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AudioVisualSumOrderByAggregateInputSchema).optional()
}).strict();

export const AudioVisualScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AudioVisualScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AudioVisualScalarWhereWithAggregatesInputSchema),z.lazy(() => AudioVisualScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AudioVisualScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AudioVisualScalarWhereWithAggregatesInputSchema),z.lazy(() => AudioVisualScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deadline: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  audiovisualType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ExternalTransportationWhereInputSchema: z.ZodType<Prisma.ExternalTransportationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExternalTransportationWhereInputSchema),z.lazy(() => ExternalTransportationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExternalTransportationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExternalTransportationWhereInputSchema),z.lazy(() => ExternalTransportationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromWhere: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toWhere: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationOrderByWithRelationInputSchema: z.ZodType<Prisma.ExternalTransportationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromWhere: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  transportType: z.lazy(() => SortOrderSchema).optional(),
  patientName: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputSchema).optional()
}).strict();

export const ExternalTransportationWhereUniqueInputSchema: z.ZodType<Prisma.ExternalTransportationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ExternalTransportationWhereInputSchema),z.lazy(() => ExternalTransportationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExternalTransportationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExternalTransportationWhereInputSchema),z.lazy(() => ExternalTransportationWhereInputSchema).array() ]).optional(),
  fromWhere: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toWhere: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict());

export const ExternalTransportationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExternalTransportationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromWhere: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  transportType: z.lazy(() => SortOrderSchema).optional(),
  patientName: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExternalTransportationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExternalTransportationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExternalTransportationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExternalTransportationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExternalTransportationSumOrderByAggregateInputSchema).optional()
}).strict();

export const ExternalTransportationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExternalTransportationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputSchema),z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputSchema),z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  fromWhere: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toWhere: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  transportType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  patientName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EquipmentDeliveryWhereInputSchema: z.ZodType<Prisma.EquipmentDeliveryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EquipmentDeliveryWhereInputSchema),z.lazy(() => EquipmentDeliveryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EquipmentDeliveryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EquipmentDeliveryWhereInputSchema),z.lazy(() => EquipmentDeliveryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  equipments: z.lazy(() => StringNullableListFilterSchema).optional(),
  toWhere: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryOrderByWithRelationInputSchema: z.ZodType<Prisma.EquipmentDeliveryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  equipments: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputSchema).optional()
}).strict();

export const EquipmentDeliveryWhereUniqueInputSchema: z.ZodType<Prisma.EquipmentDeliveryWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EquipmentDeliveryWhereInputSchema),z.lazy(() => EquipmentDeliveryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EquipmentDeliveryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EquipmentDeliveryWhereInputSchema),z.lazy(() => EquipmentDeliveryWhereInputSchema).array() ]).optional(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  equipments: z.lazy(() => StringNullableListFilterSchema).optional(),
  toWhere: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict());

export const EquipmentDeliveryOrderByWithAggregationInputSchema: z.ZodType<Prisma.EquipmentDeliveryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  equipments: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EquipmentDeliveryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EquipmentDeliveryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EquipmentDeliveryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EquipmentDeliveryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EquipmentDeliverySumOrderByAggregateInputSchema).optional()
}).strict();

export const EquipmentDeliveryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EquipmentDeliveryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputSchema),z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputSchema),z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  deadline: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  equipments: z.lazy(() => StringNullableListFilterSchema).optional(),
  toWhere: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LanguageWhereInputSchema: z.ZodType<Prisma.LanguageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LanguageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict();

export const LanguageOrderByWithRelationInputSchema: z.ZodType<Prisma.LanguageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputSchema).optional()
}).strict();

export const LanguageWhereUniqueInputSchema: z.ZodType<Prisma.LanguageWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LanguageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LanguageWhereInputSchema),z.lazy(() => LanguageWhereInputSchema).array() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict());

export const LanguageOrderByWithAggregationInputSchema: z.ZodType<Prisma.LanguageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LanguageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LanguageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LanguageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LanguageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LanguageSumOrderByAggregateInputSchema).optional()
}).strict();

export const LanguageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LanguageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema),z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema),z.lazy(() => LanguageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SecurityWhereInputSchema: z.ZodType<Prisma.SecurityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SecurityWhereInputSchema),z.lazy(() => SecurityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SecurityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SecurityWhereInputSchema),z.lazy(() => SecurityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict();

export const SecurityOrderByWithRelationInputSchema: z.ZodType<Prisma.SecurityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputSchema).optional()
}).strict();

export const SecurityWhereUniqueInputSchema: z.ZodType<Prisma.SecurityWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SecurityWhereInputSchema),z.lazy(() => SecurityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SecurityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SecurityWhereInputSchema),z.lazy(() => SecurityWhereInputSchema).array() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceRequest: z.union([ z.lazy(() => ServiceRequestScalarRelationFilterSchema),z.lazy(() => ServiceRequestWhereInputSchema) ]).optional(),
}).strict());

export const SecurityOrderByWithAggregationInputSchema: z.ZodType<Prisma.SecurityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SecurityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SecurityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SecurityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SecurityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SecuritySumOrderByAggregateInputSchema).optional()
}).strict();

export const SecurityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SecurityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SecurityScalarWhereWithAggregatesInputSchema),z.lazy(() => SecurityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SecurityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SecurityScalarWhereWithAggregatesInputSchema),z.lazy(() => SecurityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EdgeWhereInputSchema: z.ZodType<Prisma.EdgeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EdgeWhereInputSchema),z.lazy(() => EdgeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EdgeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EdgeWhereInputSchema),z.lazy(() => EdgeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromNode: z.union([ z.lazy(() => NodeScalarRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  toNode: z.union([ z.lazy(() => NodeScalarRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
}).strict();

export const EdgeOrderByWithRelationInputSchema: z.ZodType<Prisma.EdgeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  fromNode: z.lazy(() => NodeOrderByWithRelationInputSchema).optional(),
  toNode: z.lazy(() => NodeOrderByWithRelationInputSchema).optional()
}).strict();

export const EdgeWhereUniqueInputSchema: z.ZodType<Prisma.EdgeWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EdgeWhereInputSchema),z.lazy(() => EdgeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EdgeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EdgeWhereInputSchema),z.lazy(() => EdgeWhereInputSchema).array() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  fromNode: z.union([ z.lazy(() => NodeScalarRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  toNode: z.union([ z.lazy(() => NodeScalarRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
}).strict());

export const EdgeOrderByWithAggregationInputSchema: z.ZodType<Prisma.EdgeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EdgeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EdgeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EdgeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EdgeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EdgeSumOrderByAggregateInputSchema).optional()
}).strict();

export const EdgeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EdgeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EdgeScalarWhereWithAggregatesInputSchema),z.lazy(() => EdgeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EdgeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EdgeScalarWhereWithAggregatesInputSchema),z.lazy(() => EdgeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const NodeWhereInputSchema: z.ZodType<Prisma.NodeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumnodeTypeFilterSchema),z.lazy(() => nodeTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  long: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  outside: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  fromEdge: z.lazy(() => EdgeListRelationFilterSchema).optional(),
  toEdge: z.lazy(() => EdgeListRelationFilterSchema).optional(),
  Location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict();

export const NodeOrderByWithRelationInputSchema: z.ZodType<Prisma.NodeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  outside: z.lazy(() => SortOrderSchema).optional(),
  fromEdge: z.lazy(() => EdgeOrderByRelationAggregateInputSchema).optional(),
  toEdge: z.lazy(() => EdgeOrderByRelationAggregateInputSchema).optional(),
  Location: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NodeWhereUniqueInputSchema: z.ZodType<Prisma.NodeWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumnodeTypeFilterSchema),z.lazy(() => nodeTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  long: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  outside: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  fromEdge: z.lazy(() => EdgeListRelationFilterSchema).optional(),
  toEdge: z.lazy(() => EdgeListRelationFilterSchema).optional(),
  Location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict());

export const NodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  outside: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NodeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NodeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NodeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NodeSumOrderByAggregateInputSchema).optional()
}).strict();

export const NodeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NodeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NodeScalarWhereWithAggregatesInputSchema),z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeScalarWhereWithAggregatesInputSchema),z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumnodeTypeWithAggregatesFilterSchema),z.lazy(() => nodeTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  long: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  outside: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  floor: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  suite: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  buildingId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  departmentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  nodeID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  building: z.union([ z.lazy(() => BuildingScalarRelationFilterSchema),z.lazy(() => BuildingWhereInputSchema) ]).optional(),
  Department: z.union([ z.lazy(() => DepartmentNullableScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional().nullable(),
  node: z.union([ z.lazy(() => NodeNullableScalarRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  suite: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nodeID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  building: z.lazy(() => BuildingOrderByWithRelationInputSchema).optional(),
  Department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  node: z.lazy(() => NodeOrderByWithRelationInputSchema).optional()
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  floor: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  suite: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  buildingId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  departmentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  nodeID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  building: z.union([ z.lazy(() => BuildingScalarRelationFilterSchema),z.lazy(() => BuildingWhereInputSchema) ]).optional(),
  Department: z.union([ z.lazy(() => DepartmentNullableScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional().nullable(),
  node: z.union([ z.lazy(() => NodeNullableScalarRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
}).strict());

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  suite: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nodeID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  floor: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  suite: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  buildingId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  departmentId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  nodeID: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const DepartmentWhereInputSchema: z.ZodType<Prisma.DepartmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesListRelationFilterSchema).optional(),
  Location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict();

export const DepartmentOrderByWithRelationInputSchema: z.ZodType<Prisma.DepartmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesOrderByRelationAggregateInputSchema).optional(),
  Location: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DepartmentWhereUniqueInputSchema: z.ZodType<Prisma.DepartmentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesListRelationFilterSchema).optional(),
  Location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict());

export const DepartmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DepartmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DepartmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DepartmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DepartmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DepartmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DepartmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const DepartmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DepartmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesListRelationFilterSchema).optional()
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesListRelationFilterSchema).optional()
}).strict());

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DepartmentServicesWhereInputSchema: z.ZodType<Prisma.DepartmentServicesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentServicesWhereInputSchema),z.lazy(() => DepartmentServicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentServicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentServicesWhereInputSchema),z.lazy(() => DepartmentServicesWhereInputSchema).array() ]).optional(),
  departmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  serviceID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceScalarRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict();

export const DepartmentServicesOrderByWithRelationInputSchema: z.ZodType<Prisma.DepartmentServicesOrderByWithRelationInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional()
}).strict();

export const DepartmentServicesWhereUniqueInputSchema: z.ZodType<Prisma.DepartmentServicesWhereUniqueInput> = z.object({
  departmentID_serviceID: z.lazy(() => DepartmentServicesDepartmentIDServiceIDCompoundUniqueInputSchema)
})
.and(z.object({
  departmentID_serviceID: z.lazy(() => DepartmentServicesDepartmentIDServiceIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => DepartmentServicesWhereInputSchema),z.lazy(() => DepartmentServicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentServicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentServicesWhereInputSchema),z.lazy(() => DepartmentServicesWhereInputSchema).array() ]).optional(),
  departmentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  serviceID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceScalarRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict());

export const DepartmentServicesOrderByWithAggregationInputSchema: z.ZodType<Prisma.DepartmentServicesOrderByWithAggregationInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DepartmentServicesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DepartmentServicesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DepartmentServicesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DepartmentServicesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DepartmentServicesSumOrderByAggregateInputSchema).optional()
}).strict();

export const DepartmentServicesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DepartmentServicesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  departmentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  serviceID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const BuildingWhereInputSchema: z.ZodType<Prisma.BuildingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict();

export const BuildingOrderByWithRelationInputSchema: z.ZodType<Prisma.BuildingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  Location: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BuildingWhereUniqueInputSchema: z.ZodType<Prisma.BuildingWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict());

export const BuildingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BuildingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BuildingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BuildingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BuildingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BuildingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BuildingSumOrderByAggregateInputSchema).optional()
}).strict();

export const BuildingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BuildingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema),z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema),z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SearchAlgorithmWhereInputSchema: z.ZodType<Prisma.SearchAlgorithmWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SearchAlgorithmWhereInputSchema),z.lazy(() => SearchAlgorithmWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SearchAlgorithmWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SearchAlgorithmWhereInputSchema),z.lazy(() => SearchAlgorithmWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  current: z.union([ z.lazy(() => EnumAlgorithmFilterSchema),z.lazy(() => AlgorithmSchema) ]).optional(),
}).strict();

export const SearchAlgorithmOrderByWithRelationInputSchema: z.ZodType<Prisma.SearchAlgorithmOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  current: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchAlgorithmWhereUniqueInputSchema: z.ZodType<Prisma.SearchAlgorithmWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SearchAlgorithmWhereInputSchema),z.lazy(() => SearchAlgorithmWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SearchAlgorithmWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SearchAlgorithmWhereInputSchema),z.lazy(() => SearchAlgorithmWhereInputSchema).array() ]).optional(),
  current: z.union([ z.lazy(() => EnumAlgorithmFilterSchema),z.lazy(() => AlgorithmSchema) ]).optional(),
}).strict());

export const SearchAlgorithmOrderByWithAggregationInputSchema: z.ZodType<Prisma.SearchAlgorithmOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  current: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SearchAlgorithmCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SearchAlgorithmAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SearchAlgorithmMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SearchAlgorithmMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SearchAlgorithmSumOrderByAggregateInputSchema).optional()
}).strict();

export const SearchAlgorithmScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SearchAlgorithmScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SearchAlgorithmScalarWhereWithAggregatesInputSchema),z.lazy(() => SearchAlgorithmScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SearchAlgorithmScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SearchAlgorithmScalarWhereWithAggregatesInputSchema),z.lazy(() => SearchAlgorithmScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  current: z.union([ z.lazy(() => EnumAlgorithmWithAggregatesFilterSchema),z.lazy(() => AlgorithmSchema) ]).optional(),
}).strict();

export const EmployeeCreateInputSchema: z.ZodType<Prisma.EmployeeCreateInput> = z.object({
  email: z.string(),
  username: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  canService: z.union([ z.lazy(() => EmployeeCreatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeCreatelanguageInputSchema),z.string().array() ]).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestCreateNestedManyWithoutAssignedToInputSchema).optional()
}).strict();

export const EmployeeUncheckedCreateInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  canService: z.union([ z.lazy(() => EmployeeCreatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeCreatelanguageInputSchema),z.string().array() ]).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional()
}).strict();

export const EmployeeUpdateInputSchema: z.ZodType<Prisma.EmployeeUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  canService: z.union([ z.lazy(() => EmployeeUpdatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeUpdatelanguageInputSchema),z.string().array() ]).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestUpdateManyWithoutAssignedToNestedInputSchema).optional()
}).strict();

export const EmployeeUncheckedUpdateInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  canService: z.union([ z.lazy(() => EmployeeUpdatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeUpdatelanguageInputSchema),z.string().array() ]).optional(),
  ServiceRequest: z.lazy(() => ServiceRequestUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional()
}).strict();

export const EmployeeCreateManyInputSchema: z.ZodType<Prisma.EmployeeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  canService: z.union([ z.lazy(() => EmployeeCreatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeCreatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const EmployeeUpdateManyMutationInputSchema: z.ZodType<Prisma.EmployeeUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  canService: z.union([ z.lazy(() => EmployeeUpdatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeUpdatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const EmployeeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  canService: z.union([ z.lazy(() => EmployeeUpdatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeUpdatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const ServiceRequestCreateInputSchema: z.ZodType<Prisma.ServiceRequestCreateInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  assignedTo: z.lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUpdateInputSchema: z.ZodType<Prisma.ServiceRequestUpdateInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestCreateManyInputSchema: z.ZodType<Prisma.ServiceRequestCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema)
}).strict();

export const ServiceRequestUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceRequestUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceRequestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AudioVisualCreateInputSchema: z.ZodType<Prisma.AudioVisualCreateInput> = z.object({
  location: z.string(),
  deadline: z.coerce.date(),
  audiovisualType: z.string(),
  serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutAudioVisualInputSchema)
}).strict();

export const AudioVisualUncheckedCreateInputSchema: z.ZodType<Prisma.AudioVisualUncheckedCreateInput> = z.object({
  id: z.number().int(),
  location: z.string(),
  deadline: z.coerce.date(),
  audiovisualType: z.string()
}).strict();

export const AudioVisualUpdateInputSchema: z.ZodType<Prisma.AudioVisualUpdateInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  audiovisualType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceRequest: z.lazy(() => ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInputSchema).optional()
}).strict();

export const AudioVisualUncheckedUpdateInputSchema: z.ZodType<Prisma.AudioVisualUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  audiovisualType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AudioVisualCreateManyInputSchema: z.ZodType<Prisma.AudioVisualCreateManyInput> = z.object({
  id: z.number().int(),
  location: z.string(),
  deadline: z.coerce.date(),
  audiovisualType: z.string()
}).strict();

export const AudioVisualUpdateManyMutationInputSchema: z.ZodType<Prisma.AudioVisualUpdateManyMutationInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  audiovisualType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AudioVisualUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AudioVisualUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  audiovisualType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationCreateInputSchema: z.ZodType<Prisma.ExternalTransportationCreateInput> = z.object({
  fromWhere: z.string(),
  toWhere: z.string(),
  transportType: z.string(),
  patientName: z.string(),
  pickupTime: z.coerce.date(),
  serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutExternalTransportationInputSchema)
}).strict();

export const ExternalTransportationUncheckedCreateInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedCreateInput> = z.object({
  id: z.number().int(),
  fromWhere: z.string(),
  toWhere: z.string(),
  transportType: z.string(),
  patientName: z.string(),
  pickupTime: z.coerce.date()
}).strict();

export const ExternalTransportationUpdateInputSchema: z.ZodType<Prisma.ExternalTransportationUpdateInput> = z.object({
  fromWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceRequest: z.lazy(() => ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInputSchema).optional()
}).strict();

export const ExternalTransportationUncheckedUpdateInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationCreateManyInputSchema: z.ZodType<Prisma.ExternalTransportationCreateManyInput> = z.object({
  id: z.number().int(),
  fromWhere: z.string(),
  toWhere: z.string(),
  transportType: z.string(),
  patientName: z.string(),
  pickupTime: z.coerce.date()
}).strict();

export const ExternalTransportationUpdateManyMutationInputSchema: z.ZodType<Prisma.ExternalTransportationUpdateManyMutationInput> = z.object({
  fromWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryCreateInputSchema: z.ZodType<Prisma.EquipmentDeliveryCreateInput> = z.object({
  deadline: z.coerce.date(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryCreateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.string(),
  serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInputSchema)
}).strict();

export const EquipmentDeliveryUncheckedCreateInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedCreateInput> = z.object({
  id: z.number().int(),
  deadline: z.coerce.date(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryCreateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.string()
}).strict();

export const EquipmentDeliveryUpdateInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateInput> = z.object({
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryUpdateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceRequest: z.lazy(() => ServiceRequestUpdateOneRequiredWithoutEquipmentDeliveryNestedInputSchema).optional()
}).strict();

export const EquipmentDeliveryUncheckedUpdateInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryUpdateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryCreateManyInputSchema: z.ZodType<Prisma.EquipmentDeliveryCreateManyInput> = z.object({
  id: z.number().int(),
  deadline: z.coerce.date(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryCreateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.string()
}).strict();

export const EquipmentDeliveryUpdateManyMutationInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateManyMutationInput> = z.object({
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryUpdateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryUpdateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageCreateInputSchema: z.ZodType<Prisma.LanguageCreateInput> = z.object({
  location: z.string(),
  language: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutLanguageInputSchema)
}).strict();

export const LanguageUncheckedCreateInputSchema: z.ZodType<Prisma.LanguageUncheckedCreateInput> = z.object({
  id: z.number().int(),
  location: z.string(),
  language: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const LanguageUpdateInputSchema: z.ZodType<Prisma.LanguageUpdateInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceRequest: z.lazy(() => ServiceRequestUpdateOneRequiredWithoutLanguageNestedInputSchema).optional()
}).strict();

export const LanguageUncheckedUpdateInputSchema: z.ZodType<Prisma.LanguageUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageCreateManyInputSchema: z.ZodType<Prisma.LanguageCreateManyInput> = z.object({
  id: z.number().int(),
  location: z.string(),
  language: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const LanguageUpdateManyMutationInputSchema: z.ZodType<Prisma.LanguageUpdateManyMutationInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LanguageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SecurityCreateInputSchema: z.ZodType<Prisma.SecurityCreateInput> = z.object({
  location: z.string(),
  serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutSecurityInputSchema)
}).strict();

export const SecurityUncheckedCreateInputSchema: z.ZodType<Prisma.SecurityUncheckedCreateInput> = z.object({
  id: z.number().int(),
  location: z.string()
}).strict();

export const SecurityUpdateInputSchema: z.ZodType<Prisma.SecurityUpdateInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceRequest: z.lazy(() => ServiceRequestUpdateOneRequiredWithoutSecurityNestedInputSchema).optional()
}).strict();

export const SecurityUncheckedUpdateInputSchema: z.ZodType<Prisma.SecurityUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SecurityCreateManyInputSchema: z.ZodType<Prisma.SecurityCreateManyInput> = z.object({
  id: z.number().int(),
  location: z.string()
}).strict();

export const SecurityUpdateManyMutationInputSchema: z.ZodType<Prisma.SecurityUpdateManyMutationInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SecurityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SecurityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EdgeCreateInputSchema: z.ZodType<Prisma.EdgeCreateInput> = z.object({
  fromNode: z.lazy(() => NodeCreateNestedOneWithoutFromEdgeInputSchema),
  toNode: z.lazy(() => NodeCreateNestedOneWithoutToEdgeInputSchema)
}).strict();

export const EdgeUncheckedCreateInputSchema: z.ZodType<Prisma.EdgeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int()
}).strict();

export const EdgeUpdateInputSchema: z.ZodType<Prisma.EdgeUpdateInput> = z.object({
  fromNode: z.lazy(() => NodeUpdateOneRequiredWithoutFromEdgeNestedInputSchema).optional(),
  toNode: z.lazy(() => NodeUpdateOneRequiredWithoutToEdgeNestedInputSchema).optional()
}).strict();

export const EdgeUncheckedUpdateInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EdgeCreateManyInputSchema: z.ZodType<Prisma.EdgeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int()
}).strict();

export const EdgeUpdateManyMutationInputSchema: z.ZodType<Prisma.EdgeUpdateManyMutationInput> = z.object({
}).strict();

export const EdgeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeCreateInputSchema: z.ZodType<Prisma.NodeCreateInput> = z.object({
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  fromEdge: z.lazy(() => EdgeCreateNestedManyWithoutFromNodeInputSchema).optional(),
  toEdge: z.lazy(() => EdgeCreateNestedManyWithoutToNodeInputSchema).optional(),
  Location: z.lazy(() => LocationCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  fromEdge: z.lazy(() => EdgeUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  toEdge: z.lazy(() => EdgeUncheckedCreateNestedManyWithoutToNodeInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUpdateInputSchema: z.ZodType<Prisma.NodeUpdateInput> = z.object({
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  fromEdge: z.lazy(() => EdgeUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  toEdge: z.lazy(() => EdgeUpdateManyWithoutToNodeNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  fromEdge: z.lazy(() => EdgeUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  toEdge: z.lazy(() => EdgeUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeCreateManyInputSchema: z.ZodType<Prisma.NodeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean()
}).strict();

export const NodeUpdateManyMutationInputSchema: z.ZodType<Prisma.NodeUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  building: z.lazy(() => BuildingCreateNestedOneWithoutLocationInputSchema),
  Department: z.lazy(() => DepartmentCreateNestedOneWithoutLocationInputSchema).optional(),
  node: z.lazy(() => NodeCreateNestedOneWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  buildingId: z.number().int(),
  departmentId: z.number().int().optional().nullable(),
  nodeID: z.number().int().optional().nullable()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.lazy(() => BuildingUpdateOneRequiredWithoutLocationNestedInputSchema).optional(),
  Department: z.lazy(() => DepartmentUpdateOneWithoutLocationNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateOneWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  departmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nodeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  buildingId: z.number().int(),
  departmentId: z.number().int().optional().nullable(),
  nodeID: z.number().int().optional().nullable()
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  departmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nodeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DepartmentCreateInputSchema: z.ZodType<Prisma.DepartmentCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string(),
  DepartmentServices: z.lazy(() => DepartmentServicesCreateNestedManyWithoutDepartmentInputSchema).optional(),
  Location: z.lazy(() => LocationCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string(),
  DepartmentServices: z.lazy(() => DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUpdateInputSchema: z.ZodType<Prisma.DepartmentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentCreateManyInputSchema: z.ZodType<Prisma.DepartmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string()
}).strict();

export const DepartmentUpdateManyMutationInputSchema: z.ZodType<Prisma.DepartmentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  name: z.string(),
  DepartmentServices: z.lazy(() => DepartmentServicesCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  DepartmentServices: z.lazy(() => DepartmentServicesUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentServicesCreateInputSchema: z.ZodType<Prisma.DepartmentServicesCreateInput> = z.object({
  department: z.lazy(() => DepartmentCreateNestedOneWithoutDepartmentServicesInputSchema),
  service: z.lazy(() => ServiceCreateNestedOneWithoutDepartmentServicesInputSchema)
}).strict();

export const DepartmentServicesUncheckedCreateInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateInput> = z.object({
  departmentID: z.number().int(),
  serviceID: z.number().int()
}).strict();

export const DepartmentServicesUpdateInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateInput> = z.object({
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputSchema).optional()
}).strict();

export const DepartmentServicesUncheckedUpdateInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateInput> = z.object({
  departmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  serviceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentServicesCreateManyInputSchema: z.ZodType<Prisma.DepartmentServicesCreateManyInput> = z.object({
  departmentID: z.number().int(),
  serviceID: z.number().int()
}).strict();

export const DepartmentServicesUpdateManyMutationInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyMutationInput> = z.object({
}).strict();

export const DepartmentServicesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyInput> = z.object({
  departmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  serviceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildingCreateInputSchema: z.ZodType<Prisma.BuildingCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  Location: z.lazy(() => LocationCreateNestedManyWithoutBuildingInputSchema).optional()
}).strict();

export const BuildingUncheckedCreateInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  Location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutBuildingInputSchema).optional()
}).strict();

export const BuildingUpdateInputSchema: z.ZodType<Prisma.BuildingUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Location: z.lazy(() => LocationUpdateManyWithoutBuildingNestedInputSchema).optional()
}).strict();

export const BuildingUncheckedUpdateInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Location: z.lazy(() => LocationUncheckedUpdateManyWithoutBuildingNestedInputSchema).optional()
}).strict();

export const BuildingCreateManyInputSchema: z.ZodType<Prisma.BuildingCreateManyInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string()
}).strict();

export const BuildingUpdateManyMutationInputSchema: z.ZodType<Prisma.BuildingUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchAlgorithmCreateInputSchema: z.ZodType<Prisma.SearchAlgorithmCreateInput> = z.object({
  current: z.lazy(() => AlgorithmSchema)
}).strict();

export const SearchAlgorithmUncheckedCreateInputSchema: z.ZodType<Prisma.SearchAlgorithmUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  current: z.lazy(() => AlgorithmSchema)
}).strict();

export const SearchAlgorithmUpdateInputSchema: z.ZodType<Prisma.SearchAlgorithmUpdateInput> = z.object({
  current: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => EnumAlgorithmFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchAlgorithmUncheckedUpdateInputSchema: z.ZodType<Prisma.SearchAlgorithmUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  current: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => EnumAlgorithmFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchAlgorithmCreateManyInputSchema: z.ZodType<Prisma.SearchAlgorithmCreateManyInput> = z.object({
  id: z.number().int().optional(),
  current: z.lazy(() => AlgorithmSchema)
}).strict();

export const SearchAlgorithmUpdateManyMutationInputSchema: z.ZodType<Prisma.SearchAlgorithmUpdateManyMutationInput> = z.object({
  current: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => EnumAlgorithmFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchAlgorithmUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SearchAlgorithmUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  current: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => EnumAlgorithmFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumRequestTypeNullableListFilterSchema: z.ZodType<Prisma.EnumRequestTypeNullableListFilter> = z.object({
  equals: z.lazy(() => RequestTypeSchema).array().optional().nullable(),
  has: z.lazy(() => RequestTypeSchema).optional().nullable(),
  hasEvery: z.lazy(() => RequestTypeSchema).array().optional(),
  hasSome: z.lazy(() => RequestTypeSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const ServiceRequestListRelationFilterSchema: z.ZodType<Prisma.ServiceRequestListRelationFilter> = z.object({
  every: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  some: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  none: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const ServiceRequestOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ServiceRequestOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  canService: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeSumOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumRequestTypeFilterSchema: z.ZodType<Prisma.EnumRequestTypeFilter> = z.object({
  equals: z.lazy(() => RequestTypeSchema).optional(),
  in: z.lazy(() => RequestTypeSchema).array().optional(),
  notIn: z.lazy(() => RequestTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => NestedEnumRequestTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumPriorityFilterSchema: z.ZodType<Prisma.EnumPriorityFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityFilterSchema) ]).optional(),
}).strict();

export const EmployeeNullableScalarRelationFilterSchema: z.ZodType<Prisma.EmployeeNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EmployeeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EmployeeWhereInputSchema).optional().nullable()
}).strict();

export const AudioVisualNullableScalarRelationFilterSchema: z.ZodType<Prisma.AudioVisualNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AudioVisualWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AudioVisualWhereInputSchema).optional().nullable()
}).strict();

export const ExternalTransportationNullableScalarRelationFilterSchema: z.ZodType<Prisma.ExternalTransportationNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ExternalTransportationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ExternalTransportationWhereInputSchema).optional().nullable()
}).strict();

export const EquipmentDeliveryNullableScalarRelationFilterSchema: z.ZodType<Prisma.EquipmentDeliveryNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EquipmentDeliveryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EquipmentDeliveryWhereInputSchema).optional().nullable()
}).strict();

export const LanguageNullableScalarRelationFilterSchema: z.ZodType<Prisma.LanguageNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => LanguageWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LanguageWhereInputSchema).optional().nullable()
}).strict();

export const SecurityNullableScalarRelationFilterSchema: z.ZodType<Prisma.SecurityNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => SecurityWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SecurityWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ServiceRequestCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceRequestCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  dateUpdated: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.lazy(() => SortOrderSchema).optional(),
  fromEmployee: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceRequestAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceRequestAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceRequestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceRequestMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  dateUpdated: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.lazy(() => SortOrderSchema).optional(),
  fromEmployee: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceRequestMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceRequestMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  dateUpdated: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.lazy(() => SortOrderSchema).optional(),
  fromEmployee: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceRequestSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceRequestSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  assignedEmployeeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRequestTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRequestTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RequestTypeSchema).optional(),
  in: z.lazy(() => RequestTypeSchema).array().optional(),
  notIn: z.lazy(() => RequestTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => NestedEnumRequestTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRequestTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRequestTypeFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional()
}).strict();

export const ServiceRequestScalarRelationFilterSchema: z.ZodType<Prisma.ServiceRequestScalarRelationFilter> = z.object({
  is: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  isNot: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const AudioVisualCountOrderByAggregateInputSchema: z.ZodType<Prisma.AudioVisualCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  audiovisualType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AudioVisualAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AudioVisualAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AudioVisualMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AudioVisualMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  audiovisualType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AudioVisualMinOrderByAggregateInputSchema: z.ZodType<Prisma.AudioVisualMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  audiovisualType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AudioVisualSumOrderByAggregateInputSchema: z.ZodType<Prisma.AudioVisualSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExternalTransportationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExternalTransportationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromWhere: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  transportType: z.lazy(() => SortOrderSchema).optional(),
  patientName: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExternalTransportationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExternalTransportationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExternalTransportationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExternalTransportationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromWhere: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  transportType: z.lazy(() => SortOrderSchema).optional(),
  patientName: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExternalTransportationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExternalTransportationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromWhere: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional(),
  transportType: z.lazy(() => SortOrderSchema).optional(),
  patientName: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExternalTransportationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExternalTransportationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EquipmentDeliveryCountOrderByAggregateInputSchema: z.ZodType<Prisma.EquipmentDeliveryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  equipments: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EquipmentDeliveryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EquipmentDeliveryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EquipmentDeliveryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EquipmentDeliveryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EquipmentDeliveryMinOrderByAggregateInputSchema: z.ZodType<Prisma.EquipmentDeliveryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  toWhere: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EquipmentDeliverySumOrderByAggregateInputSchema: z.ZodType<Prisma.EquipmentDeliverySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageCountOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageMinOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LanguageSumOrderByAggregateInputSchema: z.ZodType<Prisma.LanguageSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SecurityCountOrderByAggregateInputSchema: z.ZodType<Prisma.SecurityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SecurityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SecurityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SecurityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SecurityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SecurityMinOrderByAggregateInputSchema: z.ZodType<Prisma.SecurityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SecuritySumOrderByAggregateInputSchema: z.ZodType<Prisma.SecuritySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeScalarRelationFilterSchema: z.ZodType<Prisma.NodeScalarRelationFilter> = z.object({
  is: z.lazy(() => NodeWhereInputSchema).optional(),
  isNot: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const EdgeCountOrderByAggregateInputSchema: z.ZodType<Prisma.EdgeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EdgeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EdgeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EdgeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EdgeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EdgeMinOrderByAggregateInputSchema: z.ZodType<Prisma.EdgeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EdgeSumOrderByAggregateInputSchema: z.ZodType<Prisma.EdgeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumnodeTypeFilterSchema: z.ZodType<Prisma.EnumnodeTypeFilter> = z.object({
  equals: z.lazy(() => nodeTypeSchema).optional(),
  in: z.lazy(() => nodeTypeSchema).array().optional(),
  notIn: z.lazy(() => nodeTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => NestedEnumnodeTypeFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EdgeListRelationFilterSchema: z.ZodType<Prisma.EdgeListRelationFilter> = z.object({
  every: z.lazy(() => EdgeWhereInputSchema).optional(),
  some: z.lazy(() => EdgeWhereInputSchema).optional(),
  none: z.lazy(() => EdgeWhereInputSchema).optional()
}).strict();

export const LocationListRelationFilterSchema: z.ZodType<Prisma.LocationListRelationFilter> = z.object({
  every: z.lazy(() => LocationWhereInputSchema).optional(),
  some: z.lazy(() => LocationWhereInputSchema).optional(),
  none: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const EdgeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EdgeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.NodeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  outside: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NodeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  outside: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  outside: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeSumOrderByAggregateInputSchema: z.ZodType<Prisma.NodeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumnodeTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumnodeTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => nodeTypeSchema).optional(),
  in: z.lazy(() => nodeTypeSchema).array().optional(),
  notIn: z.lazy(() => nodeTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => NestedEnumnodeTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumnodeTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumnodeTypeFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BuildingScalarRelationFilterSchema: z.ZodType<Prisma.BuildingScalarRelationFilter> = z.object({
  is: z.lazy(() => BuildingWhereInputSchema).optional(),
  isNot: z.lazy(() => BuildingWhereInputSchema).optional()
}).strict();

export const DepartmentNullableScalarRelationFilterSchema: z.ZodType<Prisma.DepartmentNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => DepartmentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DepartmentWhereInputSchema).optional().nullable()
}).strict();

export const NodeNullableScalarRelationFilterSchema: z.ZodType<Prisma.NodeNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => NodeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NodeWhereInputSchema).optional().nullable()
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  suite: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.lazy(() => SortOrderSchema).optional(),
  nodeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.lazy(() => SortOrderSchema).optional(),
  nodeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  suite: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.lazy(() => SortOrderSchema).optional(),
  nodeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  suite: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.lazy(() => SortOrderSchema).optional(),
  nodeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  departmentId: z.lazy(() => SortOrderSchema).optional(),
  nodeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DepartmentServicesListRelationFilterSchema: z.ZodType<Prisma.DepartmentServicesListRelationFilter> = z.object({
  every: z.lazy(() => DepartmentServicesWhereInputSchema).optional(),
  some: z.lazy(() => DepartmentServicesWhereInputSchema).optional(),
  none: z.lazy(() => DepartmentServicesWhereInputSchema).optional()
}).strict();

export const DepartmentServicesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DepartmentServicesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentScalarRelationFilterSchema: z.ZodType<Prisma.DepartmentScalarRelationFilter> = z.object({
  is: z.lazy(() => DepartmentWhereInputSchema).optional(),
  isNot: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const ServiceScalarRelationFilterSchema: z.ZodType<Prisma.ServiceScalarRelationFilter> = z.object({
  is: z.lazy(() => ServiceWhereInputSchema).optional(),
  isNot: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const DepartmentServicesDepartmentIDServiceIDCompoundUniqueInputSchema: z.ZodType<Prisma.DepartmentServicesDepartmentIDServiceIDCompoundUniqueInput> = z.object({
  departmentID: z.number(),
  serviceID: z.number()
}).strict();

export const DepartmentServicesCountOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentServicesCountOrderByAggregateInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentServicesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentServicesAvgOrderByAggregateInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentServicesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentServicesMaxOrderByAggregateInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentServicesMinOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentServicesMinOrderByAggregateInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentServicesSumOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentServicesSumOrderByAggregateInput> = z.object({
  departmentID: z.lazy(() => SortOrderSchema).optional(),
  serviceID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingSumOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAlgorithmFilterSchema: z.ZodType<Prisma.EnumAlgorithmFilter> = z.object({
  equals: z.lazy(() => AlgorithmSchema).optional(),
  in: z.lazy(() => AlgorithmSchema).array().optional(),
  notIn: z.lazy(() => AlgorithmSchema).array().optional(),
  not: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => NestedEnumAlgorithmFilterSchema) ]).optional(),
}).strict();

export const SearchAlgorithmCountOrderByAggregateInputSchema: z.ZodType<Prisma.SearchAlgorithmCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  current: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchAlgorithmAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SearchAlgorithmAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchAlgorithmMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SearchAlgorithmMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  current: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchAlgorithmMinOrderByAggregateInputSchema: z.ZodType<Prisma.SearchAlgorithmMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  current: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchAlgorithmSumOrderByAggregateInputSchema: z.ZodType<Prisma.SearchAlgorithmSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAlgorithmWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAlgorithmWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AlgorithmSchema).optional(),
  in: z.lazy(() => AlgorithmSchema).array().optional(),
  notIn: z.lazy(() => AlgorithmSchema).array().optional(),
  not: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => NestedEnumAlgorithmWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAlgorithmFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAlgorithmFilterSchema).optional()
}).strict();

export const EmployeeCreatecanServiceInputSchema: z.ZodType<Prisma.EmployeeCreatecanServiceInput> = z.object({
  set: z.lazy(() => RequestTypeSchema).array()
}).strict();

export const EmployeeCreatelanguageInputSchema: z.ZodType<Prisma.EmployeeCreatelanguageInput> = z.object({
  set: z.string().array()
}).strict();

export const ServiceRequestCreateNestedManyWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestCreateNestedManyWithoutAssignedToInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema).array(),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceRequestCreateManyAssignedToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceRequestUncheckedCreateNestedManyWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateNestedManyWithoutAssignedToInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema).array(),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceRequestCreateManyAssignedToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EmployeeUpdatecanServiceInputSchema: z.ZodType<Prisma.EmployeeUpdatecanServiceInput> = z.object({
  set: z.lazy(() => RequestTypeSchema).array().optional(),
  push: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
}).strict();

export const EmployeeUpdatelanguageInputSchema: z.ZodType<Prisma.EmployeeUpdatelanguageInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ServiceRequestUpdateManyWithoutAssignedToNestedInputSchema: z.ZodType<Prisma.ServiceRequestUpdateManyWithoutAssignedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema).array(),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceRequestCreateManyAssignedToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceRequestUpdateManyWithWhereWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUpdateManyWithWhereWithoutAssignedToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceRequestScalarWhereInputSchema),z.lazy(() => ServiceRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ServiceRequestUncheckedUpdateManyWithoutAssignedToNestedInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateManyWithoutAssignedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema).array(),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceRequestCreateManyAssignedToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceRequestWhereUniqueInputSchema),z.lazy(() => ServiceRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceRequestUpdateManyWithWhereWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUpdateManyWithWhereWithoutAssignedToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceRequestScalarWhereInputSchema),z.lazy(() => ServiceRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmployeeCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmployeeCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => EmployeeWhereUniqueInputSchema).optional()
}).strict();

export const AudioVisualCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => AudioVisualCreateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AudioVisualCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => AudioVisualWhereUniqueInputSchema).optional()
}).strict();

export const ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExternalTransportationCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => ExternalTransportationWhereUniqueInputSchema).optional()
}).strict();

export const EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => EquipmentDeliveryWhereUniqueInputSchema).optional()
}).strict();

export const LanguageCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => LanguageCreateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LanguageCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => LanguageWhereUniqueInputSchema).optional()
}).strict();

export const SecurityCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => SecurityCreateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SecurityCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => SecurityWhereUniqueInputSchema).optional()
}).strict();

export const AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => AudioVisualCreateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AudioVisualCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => AudioVisualWhereUniqueInputSchema).optional()
}).strict();

export const ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExternalTransportationCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => ExternalTransportationWhereUniqueInputSchema).optional()
}).strict();

export const EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => EquipmentDeliveryWhereUniqueInputSchema).optional()
}).strict();

export const LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageUncheckedCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => LanguageCreateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LanguageCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => LanguageWhereUniqueInputSchema).optional()
}).strict();

export const SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityUncheckedCreateNestedOneWithoutServiceRequestInput> = z.object({
  create: z.union([ z.lazy(() => SecurityCreateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SecurityCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  connect: z.lazy(() => SecurityWhereUniqueInputSchema).optional()
}).strict();

export const EnumRequestTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRequestTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RequestTypeSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusSchema).optional()
}).strict();

export const EnumPriorityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PrioritySchema).optional()
}).strict();

export const EmployeeUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.EmployeeUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmployeeCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => EmployeeUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EmployeeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EmployeeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EmployeeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmployeeUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUpdateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.AudioVisualUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => AudioVisualCreateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AudioVisualCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => AudioVisualUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AudioVisualWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AudioVisualWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AudioVisualWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AudioVisualUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUpdateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.ExternalTransportationUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExternalTransportationCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => ExternalTransportationUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ExternalTransportationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ExternalTransportationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ExternalTransportationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExternalTransportationUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUpdateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => EquipmentDeliveryUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EquipmentDeliveryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EquipmentDeliveryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EquipmentDeliveryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EquipmentDeliveryUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUpdateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const LanguageUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.LanguageUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => LanguageCreateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LanguageCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => LanguageUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LanguageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LanguageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LanguageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LanguageUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => LanguageUpdateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const SecurityUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.SecurityUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => SecurityCreateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SecurityCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => SecurityUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SecurityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SecurityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SecurityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SecurityUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => SecurityUpdateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => AudioVisualCreateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AudioVisualCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => AudioVisualUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AudioVisualWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AudioVisualWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AudioVisualWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AudioVisualUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUpdateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExternalTransportationCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => ExternalTransportationUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ExternalTransportationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ExternalTransportationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ExternalTransportationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExternalTransportationUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUpdateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => EquipmentDeliveryUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EquipmentDeliveryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EquipmentDeliveryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EquipmentDeliveryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EquipmentDeliveryUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUpdateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.LanguageUncheckedUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => LanguageCreateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LanguageCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => LanguageUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LanguageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LanguageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LanguageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LanguageUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => LanguageUpdateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema: z.ZodType<Prisma.SecurityUncheckedUpdateOneWithoutServiceRequestNestedInput> = z.object({
  create: z.union([ z.lazy(() => SecurityCreateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SecurityCreateOrConnectWithoutServiceRequestInputSchema).optional(),
  upsert: z.lazy(() => SecurityUpsertWithoutServiceRequestInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SecurityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SecurityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SecurityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SecurityUpdateToOneWithWhereWithoutServiceRequestInputSchema),z.lazy(() => SecurityUpdateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedUpdateWithoutServiceRequestInputSchema) ]).optional(),
}).strict();

export const ServiceRequestCreateNestedOneWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutAudioVisualInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutAudioVisualInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional()
}).strict();

export const ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInputSchema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutAudioVisualInputSchema).optional(),
  upsert: z.lazy(() => ServiceRequestUpsertWithoutAudioVisualInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateToOneWithWhereWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUpdateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutAudioVisualInputSchema) ]).optional(),
}).strict();

export const ServiceRequestCreateNestedOneWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutExternalTransportationInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutExternalTransportationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutExternalTransportationInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional()
}).strict();

export const ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInputSchema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutExternalTransportationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutExternalTransportationInputSchema).optional(),
  upsert: z.lazy(() => ServiceRequestUpsertWithoutExternalTransportationInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateToOneWithWhereWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUpdateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutExternalTransportationInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryCreateequipmentsInputSchema: z.ZodType<Prisma.EquipmentDeliveryCreateequipmentsInput> = z.object({
  set: z.string().array()
}).strict();

export const ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional()
}).strict();

export const EquipmentDeliveryUpdateequipmentsInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateequipmentsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ServiceRequestUpdateOneRequiredWithoutEquipmentDeliveryNestedInputSchema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutEquipmentDeliveryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputSchema).optional(),
  upsert: z.lazy(() => ServiceRequestUpsertWithoutEquipmentDeliveryInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateToOneWithWhereWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUpdateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputSchema) ]).optional(),
}).strict();

export const ServiceRequestCreateNestedOneWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutLanguageInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutLanguageInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional()
}).strict();

export const ServiceRequestUpdateOneRequiredWithoutLanguageNestedInputSchema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutLanguageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutLanguageInputSchema).optional(),
  upsert: z.lazy(() => ServiceRequestUpsertWithoutLanguageInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateToOneWithWhereWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUpdateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutLanguageInputSchema) ]).optional(),
}).strict();

export const ServiceRequestCreateNestedOneWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutSecurityInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutSecurityInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional()
}).strict();

export const ServiceRequestUpdateOneRequiredWithoutSecurityNestedInputSchema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutSecurityNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceRequestCreateOrConnectWithoutSecurityInputSchema).optional(),
  upsert: z.lazy(() => ServiceRequestUpsertWithoutSecurityInputSchema).optional(),
  connect: z.lazy(() => ServiceRequestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceRequestUpdateToOneWithWhereWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUpdateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutSecurityInputSchema) ]).optional(),
}).strict();

export const NodeCreateNestedOneWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutFromEdgeInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutFromEdgeInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedOneWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutToEdgeInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutToEdgeInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NodeUpdateOneRequiredWithoutFromEdgeNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutFromEdgeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutFromEdgeInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutFromEdgeInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateToOneWithWhereWithoutFromEdgeInputSchema),z.lazy(() => NodeUpdateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutFromEdgeInputSchema) ]).optional(),
}).strict();

export const NodeUpdateOneRequiredWithoutToEdgeNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutToEdgeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutToEdgeInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutToEdgeInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateToOneWithWhereWithoutToEdgeInputSchema),z.lazy(() => NodeUpdateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutToEdgeInputSchema) ]).optional(),
}).strict();

export const EdgeCreateNestedManyWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeCreateNestedManyWithoutFromNodeInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateWithoutFromNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyFromNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EdgeCreateNestedManyWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeCreateNestedManyWithoutToNodeInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutToNodeInputSchema),z.lazy(() => EdgeCreateWithoutToNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyToNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationCreateNestedManyWithoutNodeInputSchema: z.ZodType<Prisma.LocationCreateNestedManyWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutNodeInputSchema),z.lazy(() => LocationCreateWithoutNodeInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema),z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EdgeUncheckedCreateNestedManyWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedCreateNestedManyWithoutFromNodeInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateWithoutFromNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyFromNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EdgeUncheckedCreateNestedManyWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedCreateNestedManyWithoutToNodeInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutToNodeInputSchema),z.lazy(() => EdgeCreateWithoutToNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyToNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedCreateNestedManyWithoutNodeInputSchema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutNodeInputSchema),z.lazy(() => LocationCreateWithoutNodeInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema),z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumnodeTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumnodeTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => nodeTypeSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const EdgeUpdateManyWithoutFromNodeNestedInputSchema: z.ZodType<Prisma.EdgeUpdateManyWithoutFromNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateWithoutFromNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EdgeUpsertWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => EdgeUpsertWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyFromNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EdgeUpdateWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => EdgeUpdateWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EdgeUpdateManyWithWhereWithoutFromNodeInputSchema),z.lazy(() => EdgeUpdateManyWithWhereWithoutFromNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EdgeScalarWhereInputSchema),z.lazy(() => EdgeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EdgeUpdateManyWithoutToNodeNestedInputSchema: z.ZodType<Prisma.EdgeUpdateManyWithoutToNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutToNodeInputSchema),z.lazy(() => EdgeCreateWithoutToNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EdgeUpsertWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => EdgeUpsertWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyToNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EdgeUpdateWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => EdgeUpdateWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EdgeUpdateManyWithWhereWithoutToNodeInputSchema),z.lazy(() => EdgeUpdateManyWithWhereWithoutToNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EdgeScalarWhereInputSchema),z.lazy(() => EdgeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUpdateManyWithoutNodeNestedInputSchema: z.ZodType<Prisma.LocationUpdateManyWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutNodeInputSchema),z.lazy(() => LocationCreateWithoutNodeInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema),z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutNodeInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EdgeUncheckedUpdateManyWithoutFromNodeNestedInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateManyWithoutFromNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateWithoutFromNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EdgeUpsertWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => EdgeUpsertWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyFromNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EdgeUpdateWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => EdgeUpdateWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EdgeUpdateManyWithWhereWithoutFromNodeInputSchema),z.lazy(() => EdgeUpdateManyWithWhereWithoutFromNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EdgeScalarWhereInputSchema),z.lazy(() => EdgeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EdgeUncheckedUpdateManyWithoutToNodeNestedInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateManyWithoutToNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => EdgeCreateWithoutToNodeInputSchema),z.lazy(() => EdgeCreateWithoutToNodeInputSchema).array(),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EdgeUpsertWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => EdgeUpsertWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EdgeCreateManyToNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EdgeWhereUniqueInputSchema),z.lazy(() => EdgeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EdgeUpdateWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => EdgeUpdateWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EdgeUpdateManyWithWhereWithoutToNodeInputSchema),z.lazy(() => EdgeUpdateManyWithWhereWithoutToNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EdgeScalarWhereInputSchema),z.lazy(() => EdgeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutNodeNestedInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutNodeInputSchema),z.lazy(() => LocationCreateWithoutNodeInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema),z.lazy(() => LocationCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutNodeInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BuildingCreateNestedOneWithoutLocationInputSchema: z.ZodType<Prisma.BuildingCreateNestedOneWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => BuildingCreateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BuildingCreateOrConnectWithoutLocationInputSchema).optional(),
  connect: z.lazy(() => BuildingWhereUniqueInputSchema).optional()
}).strict();

export const DepartmentCreateNestedOneWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutLocationInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedOneWithoutLocationInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutLocationInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BuildingUpdateOneRequiredWithoutLocationNestedInputSchema: z.ZodType<Prisma.BuildingUpdateOneRequiredWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => BuildingCreateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BuildingCreateOrConnectWithoutLocationInputSchema).optional(),
  upsert: z.lazy(() => BuildingUpsertWithoutLocationInputSchema).optional(),
  connect: z.lazy(() => BuildingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BuildingUpdateToOneWithWhereWithoutLocationInputSchema),z.lazy(() => BuildingUpdateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedUpdateWithoutLocationInputSchema) ]).optional(),
}).strict();

export const DepartmentUpdateOneWithoutLocationNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutLocationInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutLocationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutLocationInputSchema),z.lazy(() => DepartmentUpdateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutLocationInputSchema) ]).optional(),
}).strict();

export const NodeUpdateOneWithoutLocationNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutLocationInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutLocationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateToOneWithWhereWithoutLocationInputSchema),z.lazy(() => NodeUpdateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutLocationInputSchema) ]).optional(),
}).strict();

export const DepartmentServicesCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutDepartmentInputSchema),z.lazy(() => LocationCreateWithoutDepartmentInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutDepartmentInputSchema),z.lazy(() => LocationCreateWithoutDepartmentInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DepartmentServicesScalarWhereInputSchema),z.lazy(() => DepartmentServicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.LocationUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutDepartmentInputSchema),z.lazy(() => LocationCreateWithoutDepartmentInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DepartmentServicesScalarWhereInputSchema),z.lazy(() => DepartmentServicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutDepartmentInputSchema),z.lazy(() => LocationCreateWithoutDepartmentInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DepartmentServicesScalarWhereInputSchema),z.lazy(() => DepartmentServicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema).array(),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema),z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentServicesCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DepartmentServicesWhereUniqueInputSchema),z.lazy(() => DepartmentServicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DepartmentServicesScalarWhereInputSchema),z.lazy(() => DepartmentServicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentCreateNestedOneWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutDepartmentServicesInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutDepartmentServicesInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const ServiceCreateNestedOneWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutDepartmentServicesInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutDepartmentServicesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutDepartmentServicesInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutDepartmentServicesInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUpdateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutDepartmentServicesInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutDepartmentServicesInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutDepartmentServicesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateToOneWithWhereWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUpdateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutDepartmentServicesInputSchema) ]).optional(),
}).strict();

export const LocationCreateNestedManyWithoutBuildingInputSchema: z.ZodType<Prisma.LocationCreateNestedManyWithoutBuildingInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutBuildingInputSchema),z.lazy(() => LocationCreateWithoutBuildingInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyBuildingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedCreateNestedManyWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutBuildingInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutBuildingInputSchema),z.lazy(() => LocationCreateWithoutBuildingInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyBuildingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUpdateManyWithoutBuildingNestedInputSchema: z.ZodType<Prisma.LocationUpdateManyWithoutBuildingNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutBuildingInputSchema),z.lazy(() => LocationCreateWithoutBuildingInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyBuildingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutBuildingInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutBuildingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutBuildingNestedInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutBuildingNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutBuildingInputSchema),z.lazy(() => LocationCreateWithoutBuildingInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LocationCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyBuildingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutBuildingInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutBuildingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EnumAlgorithmFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAlgorithmFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AlgorithmSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumRequestTypeFilterSchema: z.ZodType<Prisma.NestedEnumRequestTypeFilter> = z.object({
  equals: z.lazy(() => RequestTypeSchema).optional(),
  in: z.lazy(() => RequestTypeSchema).array().optional(),
  notIn: z.lazy(() => RequestTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => NestedEnumRequestTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumPriorityFilterSchema: z.ZodType<Prisma.NestedEnumPriorityFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRequestTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRequestTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RequestTypeSchema).optional(),
  in: z.lazy(() => RequestTypeSchema).array().optional(),
  notIn: z.lazy(() => RequestTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => NestedEnumRequestTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRequestTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRequestTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional()
}).strict();

export const NestedEnumnodeTypeFilterSchema: z.ZodType<Prisma.NestedEnumnodeTypeFilter> = z.object({
  equals: z.lazy(() => nodeTypeSchema).optional(),
  in: z.lazy(() => nodeTypeSchema).array().optional(),
  notIn: z.lazy(() => nodeTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => NestedEnumnodeTypeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumnodeTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumnodeTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => nodeTypeSchema).optional(),
  in: z.lazy(() => nodeTypeSchema).array().optional(),
  notIn: z.lazy(() => nodeTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => NestedEnumnodeTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumnodeTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumnodeTypeFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumAlgorithmFilterSchema: z.ZodType<Prisma.NestedEnumAlgorithmFilter> = z.object({
  equals: z.lazy(() => AlgorithmSchema).optional(),
  in: z.lazy(() => AlgorithmSchema).array().optional(),
  notIn: z.lazy(() => AlgorithmSchema).array().optional(),
  not: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => NestedEnumAlgorithmFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAlgorithmWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAlgorithmWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AlgorithmSchema).optional(),
  in: z.lazy(() => AlgorithmSchema).array().optional(),
  notIn: z.lazy(() => AlgorithmSchema).array().optional(),
  not: z.union([ z.lazy(() => AlgorithmSchema),z.lazy(() => NestedEnumAlgorithmWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAlgorithmFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAlgorithmFilterSchema).optional()
}).strict();

export const ServiceRequestCreateWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestCreateWithoutAssignedToInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutAssignedToInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestCreateOrConnectWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutAssignedToInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema) ]),
}).strict();

export const ServiceRequestCreateManyAssignedToInputEnvelopeSchema: z.ZodType<Prisma.ServiceRequestCreateManyAssignedToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ServiceRequestCreateManyAssignedToInputSchema),z.lazy(() => ServiceRequestCreateManyAssignedToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutAssignedToInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputSchema) ]),
}).strict();

export const ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceRequestUpdateWithoutAssignedToInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutAssignedToInputSchema) ]),
}).strict();

export const ServiceRequestUpdateManyWithWhereWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUpdateManyWithWhereWithoutAssignedToInput> = z.object({
  where: z.lazy(() => ServiceRequestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceRequestUpdateManyMutationInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateManyWithoutAssignedToInputSchema) ]),
}).strict();

export const ServiceRequestScalarWhereInputSchema: z.ZodType<Prisma.ServiceRequestScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceRequestScalarWhereInputSchema),z.lazy(() => ServiceRequestScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceRequestScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceRequestScalarWhereInputSchema),z.lazy(() => ServiceRequestScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumRequestTypeFilterSchema),z.lazy(() => RequestTypeSchema) ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dateUpdated: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedEmployeeID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  fromEmployee: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
}).strict();

export const EmployeeCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeCreateWithoutServiceRequestInput> = z.object({
  email: z.string(),
  username: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  canService: z.union([ z.lazy(() => EmployeeCreatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeCreatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const EmployeeUncheckedCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateWithoutServiceRequestInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  canService: z.union([ z.lazy(() => EmployeeCreatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeCreatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const EmployeeCreateOrConnectWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeCreateOrConnectWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => EmployeeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmployeeCreateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputSchema) ]),
}).strict();

export const AudioVisualCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualCreateWithoutServiceRequestInput> = z.object({
  location: z.string(),
  deadline: z.coerce.date(),
  audiovisualType: z.string()
}).strict();

export const AudioVisualUncheckedCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualUncheckedCreateWithoutServiceRequestInput> = z.object({
  location: z.string(),
  deadline: z.coerce.date(),
  audiovisualType: z.string()
}).strict();

export const AudioVisualCreateOrConnectWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualCreateOrConnectWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => AudioVisualWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AudioVisualCreateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputSchema) ]),
}).strict();

export const ExternalTransportationCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationCreateWithoutServiceRequestInput> = z.object({
  fromWhere: z.string(),
  toWhere: z.string(),
  transportType: z.string(),
  patientName: z.string(),
  pickupTime: z.coerce.date()
}).strict();

export const ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedCreateWithoutServiceRequestInput> = z.object({
  fromWhere: z.string(),
  toWhere: z.string(),
  transportType: z.string(),
  patientName: z.string(),
  pickupTime: z.coerce.date()
}).strict();

export const ExternalTransportationCreateOrConnectWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationCreateOrConnectWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => ExternalTransportationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema) ]),
}).strict();

export const EquipmentDeliveryCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryCreateWithoutServiceRequestInput> = z.object({
  deadline: z.coerce.date(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryCreateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.string()
}).strict();

export const EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedCreateWithoutServiceRequestInput> = z.object({
  deadline: z.coerce.date(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryCreateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.string()
}).strict();

export const EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryCreateOrConnectWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => EquipmentDeliveryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema) ]),
}).strict();

export const LanguageCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageCreateWithoutServiceRequestInput> = z.object({
  location: z.string(),
  language: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const LanguageUncheckedCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageUncheckedCreateWithoutServiceRequestInput> = z.object({
  location: z.string(),
  language: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const LanguageCreateOrConnectWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageCreateOrConnectWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => LanguageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LanguageCreateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputSchema) ]),
}).strict();

export const SecurityCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityCreateWithoutServiceRequestInput> = z.object({
  location: z.string()
}).strict();

export const SecurityUncheckedCreateWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityUncheckedCreateWithoutServiceRequestInput> = z.object({
  location: z.string()
}).strict();

export const SecurityCreateOrConnectWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityCreateOrConnectWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => SecurityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SecurityCreateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputSchema) ]),
}).strict();

export const EmployeeUpsertWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeUpsertWithoutServiceRequestInput> = z.object({
  update: z.union([ z.lazy(() => EmployeeUpdateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutServiceRequestInputSchema) ]),
  create: z.union([ z.lazy(() => EmployeeCreateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputSchema) ]),
  where: z.lazy(() => EmployeeWhereInputSchema).optional()
}).strict();

export const EmployeeUpdateToOneWithWhereWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeUpdateToOneWithWhereWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => EmployeeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmployeeUpdateWithoutServiceRequestInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutServiceRequestInputSchema) ]),
}).strict();

export const EmployeeUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeUpdateWithoutServiceRequestInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  canService: z.union([ z.lazy(() => EmployeeUpdatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeUpdatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const EmployeeUncheckedUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateWithoutServiceRequestInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  canService: z.union([ z.lazy(() => EmployeeUpdatecanServiceInputSchema),z.lazy(() => RequestTypeSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => EmployeeUpdatelanguageInputSchema),z.string().array() ]).optional(),
}).strict();

export const AudioVisualUpsertWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualUpsertWithoutServiceRequestInput> = z.object({
  update: z.union([ z.lazy(() => AudioVisualUpdateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedUpdateWithoutServiceRequestInputSchema) ]),
  create: z.union([ z.lazy(() => AudioVisualCreateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputSchema) ]),
  where: z.lazy(() => AudioVisualWhereInputSchema).optional()
}).strict();

export const AudioVisualUpdateToOneWithWhereWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualUpdateToOneWithWhereWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => AudioVisualWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AudioVisualUpdateWithoutServiceRequestInputSchema),z.lazy(() => AudioVisualUncheckedUpdateWithoutServiceRequestInputSchema) ]),
}).strict();

export const AudioVisualUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualUpdateWithoutServiceRequestInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  audiovisualType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AudioVisualUncheckedUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.AudioVisualUncheckedUpdateWithoutServiceRequestInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  audiovisualType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationUpsertWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationUpsertWithoutServiceRequestInput> = z.object({
  update: z.union([ z.lazy(() => ExternalTransportationUpdateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedUpdateWithoutServiceRequestInputSchema) ]),
  create: z.union([ z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedCreateWithoutServiceRequestInputSchema) ]),
  where: z.lazy(() => ExternalTransportationWhereInputSchema).optional()
}).strict();

export const ExternalTransportationUpdateToOneWithWhereWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationUpdateToOneWithWhereWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => ExternalTransportationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExternalTransportationUpdateWithoutServiceRequestInputSchema),z.lazy(() => ExternalTransportationUncheckedUpdateWithoutServiceRequestInputSchema) ]),
}).strict();

export const ExternalTransportationUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationUpdateWithoutServiceRequestInput> = z.object({
  fromWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExternalTransportationUncheckedUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.ExternalTransportationUncheckedUpdateWithoutServiceRequestInput> = z.object({
  fromWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryUpsertWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpsertWithoutServiceRequestInput> = z.object({
  update: z.union([ z.lazy(() => EquipmentDeliveryUpdateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputSchema) ]),
  create: z.union([ z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputSchema) ]),
  where: z.lazy(() => EquipmentDeliveryWhereInputSchema).optional()
}).strict();

export const EquipmentDeliveryUpdateToOneWithWhereWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateToOneWithWhereWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => EquipmentDeliveryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EquipmentDeliveryUpdateWithoutServiceRequestInputSchema),z.lazy(() => EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputSchema) ]),
}).strict();

export const EquipmentDeliveryUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateWithoutServiceRequestInput> = z.object({
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryUpdateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInput> = z.object({
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  equipments: z.union([ z.lazy(() => EquipmentDeliveryUpdateequipmentsInputSchema),z.string().array() ]).optional(),
  toWhere: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageUpsertWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageUpsertWithoutServiceRequestInput> = z.object({
  update: z.union([ z.lazy(() => LanguageUpdateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedUpdateWithoutServiceRequestInputSchema) ]),
  create: z.union([ z.lazy(() => LanguageCreateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputSchema) ]),
  where: z.lazy(() => LanguageWhereInputSchema).optional()
}).strict();

export const LanguageUpdateToOneWithWhereWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageUpdateToOneWithWhereWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => LanguageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LanguageUpdateWithoutServiceRequestInputSchema),z.lazy(() => LanguageUncheckedUpdateWithoutServiceRequestInputSchema) ]),
}).strict();

export const LanguageUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageUpdateWithoutServiceRequestInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LanguageUncheckedUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.LanguageUncheckedUpdateWithoutServiceRequestInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SecurityUpsertWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityUpsertWithoutServiceRequestInput> = z.object({
  update: z.union([ z.lazy(() => SecurityUpdateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedUpdateWithoutServiceRequestInputSchema) ]),
  create: z.union([ z.lazy(() => SecurityCreateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputSchema) ]),
  where: z.lazy(() => SecurityWhereInputSchema).optional()
}).strict();

export const SecurityUpdateToOneWithWhereWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityUpdateToOneWithWhereWithoutServiceRequestInput> = z.object({
  where: z.lazy(() => SecurityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SecurityUpdateWithoutServiceRequestInputSchema),z.lazy(() => SecurityUncheckedUpdateWithoutServiceRequestInputSchema) ]),
}).strict();

export const SecurityUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityUpdateWithoutServiceRequestInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SecurityUncheckedUpdateWithoutServiceRequestInputSchema: z.ZodType<Prisma.SecurityUncheckedUpdateWithoutServiceRequestInput> = z.object({
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceRequestCreateWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestCreateWithoutAudioVisualInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  assignedTo: z.lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutAudioVisualInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestCreateOrConnectWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutAudioVisualInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputSchema) ]),
}).strict();

export const ServiceRequestUpsertWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestUpsertWithoutAudioVisualInput> = z.object({
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutAudioVisualInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputSchema) ]),
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const ServiceRequestUpdateToOneWithWhereWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestUpdateToOneWithWhereWithoutAudioVisualInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceRequestUpdateWithoutAudioVisualInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutAudioVisualInputSchema) ]),
}).strict();

export const ServiceRequestUpdateWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithoutAudioVisualInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateWithoutAudioVisualInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateWithoutAudioVisualInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestCreateWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestCreateWithoutExternalTransportationInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  assignedTo: z.lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutExternalTransportationInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestCreateOrConnectWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutExternalTransportationInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutExternalTransportationInputSchema) ]),
}).strict();

export const ServiceRequestUpsertWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestUpsertWithoutExternalTransportationInput> = z.object({
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutExternalTransportationInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutExternalTransportationInputSchema) ]),
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const ServiceRequestUpdateToOneWithWhereWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestUpdateToOneWithWhereWithoutExternalTransportationInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceRequestUpdateWithoutExternalTransportationInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutExternalTransportationInputSchema) ]),
}).strict();

export const ServiceRequestUpdateWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithoutExternalTransportationInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateWithoutExternalTransportationInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateWithoutExternalTransportationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestCreateWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestCreateWithoutEquipmentDeliveryInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  assignedTo: z.lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputSchema) ]),
}).strict();

export const ServiceRequestUpsertWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestUpsertWithoutEquipmentDeliveryInput> = z.object({
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputSchema) ]),
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const ServiceRequestUpdateToOneWithWhereWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestUpdateToOneWithWhereWithoutEquipmentDeliveryInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceRequestUpdateWithoutEquipmentDeliveryInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputSchema) ]),
}).strict();

export const ServiceRequestUpdateWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithoutEquipmentDeliveryInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestCreateWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestCreateWithoutLanguageInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  assignedTo: z.lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutLanguageInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestCreateOrConnectWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutLanguageInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputSchema) ]),
}).strict();

export const ServiceRequestUpsertWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestUpsertWithoutLanguageInput> = z.object({
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutLanguageInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputSchema) ]),
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const ServiceRequestUpdateToOneWithWhereWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestUpdateToOneWithWhereWithoutLanguageInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceRequestUpdateWithoutLanguageInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutLanguageInputSchema) ]),
}).strict();

export const ServiceRequestUpdateWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithoutLanguageInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateWithoutLanguageInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateWithoutLanguageInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestCreateWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestCreateWithoutSecurityInput> = z.object({
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  assignedTo: z.lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedCreateWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutSecurityInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  assignedEmployeeID: z.number().int().optional().nullable(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema),
  audioVisual: z.lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputSchema).optional()
}).strict();

export const ServiceRequestCreateOrConnectWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutSecurityInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputSchema) ]),
}).strict();

export const ServiceRequestUpsertWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestUpsertWithoutSecurityInput> = z.object({
  update: z.union([ z.lazy(() => ServiceRequestUpdateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutSecurityInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceRequestCreateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputSchema) ]),
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional()
}).strict();

export const ServiceRequestUpdateToOneWithWhereWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestUpdateToOneWithWhereWithoutSecurityInput> = z.object({
  where: z.lazy(() => ServiceRequestWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceRequestUpdateWithoutSecurityInputSchema),z.lazy(() => ServiceRequestUncheckedUpdateWithoutSecurityInputSchema) ]),
}).strict();

export const ServiceRequestUpdateWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithoutSecurityInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  audioVisual: z.lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateWithoutSecurityInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateWithoutSecurityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedEmployeeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const NodeCreateWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeCreateWithoutFromEdgeInput> = z.object({
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  toEdge: z.lazy(() => EdgeCreateNestedManyWithoutToNodeInputSchema).optional(),
  Location: z.lazy(() => LocationCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutFromEdgeInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  toEdge: z.lazy(() => EdgeUncheckedCreateNestedManyWithoutToNodeInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutFromEdgeInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputSchema) ]),
}).strict();

export const NodeCreateWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeCreateWithoutToEdgeInput> = z.object({
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  fromEdge: z.lazy(() => EdgeCreateNestedManyWithoutFromNodeInputSchema).optional(),
  Location: z.lazy(() => LocationCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutToEdgeInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  fromEdge: z.lazy(() => EdgeUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutToEdgeInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputSchema) ]),
}).strict();

export const NodeUpsertWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeUpsertWithoutFromEdgeInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutFromEdgeInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputSchema) ]),
  where: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeUpdateToOneWithWhereWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeUpdateToOneWithWhereWithoutFromEdgeInput> = z.object({
  where: z.lazy(() => NodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NodeUpdateWithoutFromEdgeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutFromEdgeInputSchema) ]),
}).strict();

export const NodeUpdateWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeUpdateWithoutFromEdgeInput> = z.object({
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  toEdge: z.lazy(() => EdgeUpdateManyWithoutToNodeNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutFromEdgeInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutFromEdgeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  toEdge: z.lazy(() => EdgeUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeUpsertWithoutToEdgeInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutToEdgeInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputSchema) ]),
  where: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeUpdateToOneWithWhereWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeUpdateToOneWithWhereWithoutToEdgeInput> = z.object({
  where: z.lazy(() => NodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NodeUpdateWithoutToEdgeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutToEdgeInputSchema) ]),
}).strict();

export const NodeUpdateWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeUpdateWithoutToEdgeInput> = z.object({
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  fromEdge: z.lazy(() => EdgeUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutToEdgeInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutToEdgeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  fromEdge: z.lazy(() => EdgeUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const EdgeCreateWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeCreateWithoutFromNodeInput> = z.object({
  toNode: z.lazy(() => NodeCreateNestedOneWithoutToEdgeInputSchema)
}).strict();

export const EdgeUncheckedCreateWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedCreateWithoutFromNodeInput> = z.object({
  id: z.number().int().optional(),
  toNodeId: z.number().int()
}).strict();

export const EdgeCreateOrConnectWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeCreateOrConnectWithoutFromNodeInput> = z.object({
  where: z.lazy(() => EdgeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EdgeCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema) ]),
}).strict();

export const EdgeCreateManyFromNodeInputEnvelopeSchema: z.ZodType<Prisma.EdgeCreateManyFromNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EdgeCreateManyFromNodeInputSchema),z.lazy(() => EdgeCreateManyFromNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EdgeCreateWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeCreateWithoutToNodeInput> = z.object({
  fromNode: z.lazy(() => NodeCreateNestedOneWithoutFromEdgeInputSchema)
}).strict();

export const EdgeUncheckedCreateWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedCreateWithoutToNodeInput> = z.object({
  id: z.number().int().optional(),
  fromNodeId: z.number().int()
}).strict();

export const EdgeCreateOrConnectWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeCreateOrConnectWithoutToNodeInput> = z.object({
  where: z.lazy(() => EdgeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EdgeCreateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema) ]),
}).strict();

export const EdgeCreateManyToNodeInputEnvelopeSchema: z.ZodType<Prisma.EdgeCreateManyToNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EdgeCreateManyToNodeInputSchema),z.lazy(() => EdgeCreateManyToNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationCreateWithoutNodeInputSchema: z.ZodType<Prisma.LocationCreateWithoutNodeInput> = z.object({
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  building: z.lazy(() => BuildingCreateNestedOneWithoutLocationInputSchema),
  Department: z.lazy(() => DepartmentCreateNestedOneWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateWithoutNodeInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutNodeInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  buildingId: z.number().int(),
  departmentId: z.number().int().optional().nullable()
}).strict();

export const LocationCreateOrConnectWithoutNodeInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutNodeInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const LocationCreateManyNodeInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyNodeInputSchema),z.lazy(() => LocationCreateManyNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EdgeUpsertWithWhereUniqueWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUpsertWithWhereUniqueWithoutFromNodeInput> = z.object({
  where: z.lazy(() => EdgeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EdgeUpdateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedUpdateWithoutFromNodeInputSchema) ]),
  create: z.union([ z.lazy(() => EdgeCreateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputSchema) ]),
}).strict();

export const EdgeUpdateWithWhereUniqueWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUpdateWithWhereUniqueWithoutFromNodeInput> = z.object({
  where: z.lazy(() => EdgeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EdgeUpdateWithoutFromNodeInputSchema),z.lazy(() => EdgeUncheckedUpdateWithoutFromNodeInputSchema) ]),
}).strict();

export const EdgeUpdateManyWithWhereWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUpdateManyWithWhereWithoutFromNodeInput> = z.object({
  where: z.lazy(() => EdgeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EdgeUpdateManyMutationInputSchema),z.lazy(() => EdgeUncheckedUpdateManyWithoutFromNodeInputSchema) ]),
}).strict();

export const EdgeScalarWhereInputSchema: z.ZodType<Prisma.EdgeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EdgeScalarWhereInputSchema),z.lazy(() => EdgeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EdgeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EdgeScalarWhereInputSchema),z.lazy(() => EdgeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const EdgeUpsertWithWhereUniqueWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUpsertWithWhereUniqueWithoutToNodeInput> = z.object({
  where: z.lazy(() => EdgeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EdgeUpdateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedUpdateWithoutToNodeInputSchema) ]),
  create: z.union([ z.lazy(() => EdgeCreateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputSchema) ]),
}).strict();

export const EdgeUpdateWithWhereUniqueWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUpdateWithWhereUniqueWithoutToNodeInput> = z.object({
  where: z.lazy(() => EdgeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EdgeUpdateWithoutToNodeInputSchema),z.lazy(() => EdgeUncheckedUpdateWithoutToNodeInputSchema) ]),
}).strict();

export const EdgeUpdateManyWithWhereWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUpdateManyWithWhereWithoutToNodeInput> = z.object({
  where: z.lazy(() => EdgeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EdgeUpdateManyMutationInputSchema),z.lazy(() => EdgeUncheckedUpdateManyWithoutToNodeInputSchema) ]),
}).strict();

export const LocationUpsertWithWhereUniqueWithoutNodeInputSchema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutNodeInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationUpdateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutNodeInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const LocationUpdateWithWhereUniqueWithoutNodeInputSchema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutNodeInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateWithoutNodeInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutNodeInputSchema) ]),
}).strict();

export const LocationUpdateManyWithWhereWithoutNodeInputSchema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutNodeInput> = z.object({
  where: z.lazy(() => LocationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateManyMutationInputSchema),z.lazy(() => LocationUncheckedUpdateManyWithoutNodeInputSchema) ]),
}).strict();

export const LocationScalarWhereInputSchema: z.ZodType<Prisma.LocationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  floor: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  suite: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  buildingId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  departmentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  nodeID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const BuildingCreateWithoutLocationInputSchema: z.ZodType<Prisma.BuildingCreateWithoutLocationInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string()
}).strict();

export const BuildingUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string()
}).strict();

export const BuildingCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.BuildingCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => BuildingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BuildingCreateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const DepartmentCreateWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutLocationInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string(),
  DepartmentServices: z.lazy(() => DepartmentServicesCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string(),
  DepartmentServices: z.lazy(() => DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const NodeCreateWithoutLocationInputSchema: z.ZodType<Prisma.NodeCreateWithoutLocationInput> = z.object({
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  fromEdge: z.lazy(() => EdgeCreateNestedManyWithoutFromNodeInputSchema).optional(),
  toEdge: z.lazy(() => EdgeCreateNestedManyWithoutToNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => nodeTypeSchema),
  description: z.string(),
  lat: z.number(),
  long: z.number(),
  outside: z.boolean(),
  fromEdge: z.lazy(() => EdgeUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  toEdge: z.lazy(() => EdgeUncheckedCreateNestedManyWithoutToNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const BuildingUpsertWithoutLocationInputSchema: z.ZodType<Prisma.BuildingUpsertWithoutLocationInput> = z.object({
  update: z.union([ z.lazy(() => BuildingUpdateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => BuildingCreateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLocationInputSchema) ]),
  where: z.lazy(() => BuildingWhereInputSchema).optional()
}).strict();

export const BuildingUpdateToOneWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.BuildingUpdateToOneWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => BuildingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BuildingUpdateWithoutLocationInputSchema),z.lazy(() => BuildingUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const BuildingUpdateWithoutLocationInputSchema: z.ZodType<Prisma.BuildingUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildingUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentUpsertWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentUpsertWithoutLocationInput> = z.object({
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputSchema) ]),
  where: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentUpdateToOneWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentUpdateToOneWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => DepartmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutLocationInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const DepartmentUpdateWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutLocationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentServices: z.lazy(() => DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithoutLocationInputSchema: z.ZodType<Prisma.NodeUpsertWithoutLocationInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedCreateWithoutLocationInputSchema) ]),
  where: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeUpdateToOneWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.NodeUpdateToOneWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => NodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NodeUpdateWithoutLocationInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const NodeUpdateWithoutLocationInputSchema: z.ZodType<Prisma.NodeUpdateWithoutLocationInput> = z.object({
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  fromEdge: z.lazy(() => EdgeUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  toEdge: z.lazy(() => EdgeUpdateManyWithoutToNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => nodeTypeSchema),z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outside: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  fromEdge: z.lazy(() => EdgeUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  toEdge: z.lazy(() => EdgeUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional()
}).strict();

export const DepartmentServicesCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesCreateWithoutDepartmentInput> = z.object({
  service: z.lazy(() => ServiceCreateNestedOneWithoutDepartmentServicesInputSchema)
}).strict();

export const DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateWithoutDepartmentInput> = z.object({
  serviceID: z.number().int()
}).strict();

export const DepartmentServicesCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => DepartmentServicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const DepartmentServicesCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.DepartmentServicesCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DepartmentServicesCreateManyDepartmentInputSchema),z.lazy(() => DepartmentServicesCreateManyDepartmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationCreateWithoutDepartmentInput> = z.object({
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  building: z.lazy(() => BuildingCreateNestedOneWithoutLocationInputSchema),
  node: z.lazy(() => NodeCreateNestedOneWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutDepartmentInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  buildingId: z.number().int(),
  nodeID: z.number().int().optional().nullable()
}).strict();

export const LocationCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const LocationCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyDepartmentInputSchema),z.lazy(() => LocationCreateManyDepartmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => DepartmentServicesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DepartmentServicesUpdateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => DepartmentServicesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DepartmentServicesUpdateWithoutDepartmentInputSchema),z.lazy(() => DepartmentServicesUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => DepartmentServicesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DepartmentServicesUpdateManyMutationInputSchema),z.lazy(() => DepartmentServicesUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const DepartmentServicesScalarWhereInputSchema: z.ZodType<Prisma.DepartmentServicesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentServicesScalarWhereInputSchema),z.lazy(() => DepartmentServicesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentServicesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentServicesScalarWhereInputSchema),z.lazy(() => DepartmentServicesScalarWhereInputSchema).array() ]).optional(),
  departmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  serviceID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const LocationUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationUpdateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const LocationUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateWithoutDepartmentInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const LocationUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => LocationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateManyMutationInputSchema),z.lazy(() => LocationUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const DepartmentServicesCreateWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesCreateWithoutServiceInput> = z.object({
  department: z.lazy(() => DepartmentCreateNestedOneWithoutDepartmentServicesInputSchema)
}).strict();

export const DepartmentServicesUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateWithoutServiceInput> = z.object({
  departmentID: z.number().int()
}).strict();

export const DepartmentServicesCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => DepartmentServicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const DepartmentServicesCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.DepartmentServicesCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DepartmentServicesCreateManyServiceInputSchema),z.lazy(() => DepartmentServicesCreateManyServiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => DepartmentServicesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DepartmentServicesUpdateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentServicesCreateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => DepartmentServicesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DepartmentServicesUpdateWithoutServiceInputSchema),z.lazy(() => DepartmentServicesUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const DepartmentServicesUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => DepartmentServicesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DepartmentServicesUpdateManyMutationInputSchema),z.lazy(() => DepartmentServicesUncheckedUpdateManyWithoutServiceInputSchema) ]),
}).strict();

export const DepartmentCreateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutDepartmentServicesInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string(),
  Location: z.lazy(() => LocationCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutDepartmentServicesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  phoneNumber: z.string(),
  Location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutDepartmentServicesInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputSchema) ]),
}).strict();

export const ServiceCreateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceCreateWithoutDepartmentServicesInput> = z.object({
  name: z.string()
}).strict();

export const ServiceUncheckedCreateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutDepartmentServicesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const ServiceCreateOrConnectWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutDepartmentServicesInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputSchema) ]),
}).strict();

export const DepartmentUpsertWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentUpsertWithoutDepartmentServicesInput> = z.object({
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutDepartmentServicesInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputSchema) ]),
  where: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentUpdateToOneWithWhereWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentUpdateToOneWithWhereWithoutDepartmentServicesInput> = z.object({
  where: z.lazy(() => DepartmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutDepartmentServicesInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutDepartmentServicesInputSchema) ]),
}).strict();

export const DepartmentUpdateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutDepartmentServicesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Location: z.lazy(() => LocationUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutDepartmentServicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Location: z.lazy(() => LocationUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const ServiceUpsertWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutDepartmentServicesInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutDepartmentServicesInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputSchema) ]),
  where: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceUpdateToOneWithWhereWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceUpdateToOneWithWhereWithoutDepartmentServicesInput> = z.object({
  where: z.lazy(() => ServiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutDepartmentServicesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutDepartmentServicesInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutDepartmentServicesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateWithoutDepartmentServicesInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutDepartmentServicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateWithoutBuildingInputSchema: z.ZodType<Prisma.LocationCreateWithoutBuildingInput> = z.object({
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  Department: z.lazy(() => DepartmentCreateNestedOneWithoutLocationInputSchema).optional(),
  node: z.lazy(() => NodeCreateNestedOneWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutBuildingInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  departmentId: z.number().int().optional().nullable(),
  nodeID: z.number().int().optional().nullable()
}).strict();

export const LocationCreateOrConnectWithoutBuildingInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutBuildingInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema) ]),
}).strict();

export const LocationCreateManyBuildingInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyBuildingInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyBuildingInputSchema),z.lazy(() => LocationCreateManyBuildingInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationUpsertWithWhereUniqueWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutBuildingInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationUpdateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutBuildingInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedCreateWithoutBuildingInputSchema) ]),
}).strict();

export const LocationUpdateWithWhereUniqueWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutBuildingInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateWithoutBuildingInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutBuildingInputSchema) ]),
}).strict();

export const LocationUpdateManyWithWhereWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutBuildingInput> = z.object({
  where: z.lazy(() => LocationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateManyMutationInputSchema),z.lazy(() => LocationUncheckedUpdateManyWithoutBuildingInputSchema) ]),
}).strict();

export const ServiceRequestCreateManyAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestCreateManyAssignedToInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => RequestTypeSchema),
  dateCreated: z.coerce.date().optional(),
  dateUpdated: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusSchema),
  description: z.string(),
  fromEmployee: z.string(),
  priority: z.lazy(() => PrioritySchema)
}).strict();

export const ServiceRequestUpdateWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUpdateWithoutAssignedToInput> = z.object({
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateWithoutAssignedToInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  audioVisual: z.lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  externalTransportation: z.lazy(() => ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  equipmentDelivery: z.lazy(() => EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  language: z.lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional(),
  security: z.lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputSchema).optional()
}).strict();

export const ServiceRequestUncheckedUpdateManyWithoutAssignedToInputSchema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateManyWithoutAssignedToInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RequestTypeSchema),z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateUpdated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmployee: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EdgeCreateManyFromNodeInputSchema: z.ZodType<Prisma.EdgeCreateManyFromNodeInput> = z.object({
  id: z.number().int().optional(),
  toNodeId: z.number().int()
}).strict();

export const EdgeCreateManyToNodeInputSchema: z.ZodType<Prisma.EdgeCreateManyToNodeInput> = z.object({
  id: z.number().int().optional(),
  fromNodeId: z.number().int()
}).strict();

export const LocationCreateManyNodeInputSchema: z.ZodType<Prisma.LocationCreateManyNodeInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  buildingId: z.number().int(),
  departmentId: z.number().int().optional().nullable()
}).strict();

export const EdgeUpdateWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUpdateWithoutFromNodeInput> = z.object({
  toNode: z.lazy(() => NodeUpdateOneRequiredWithoutToEdgeNestedInputSchema).optional()
}).strict();

export const EdgeUncheckedUpdateWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateWithoutFromNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EdgeUncheckedUpdateManyWithoutFromNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateManyWithoutFromNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EdgeUpdateWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUpdateWithoutToNodeInput> = z.object({
  fromNode: z.lazy(() => NodeUpdateOneRequiredWithoutFromEdgeNestedInputSchema).optional()
}).strict();

export const EdgeUncheckedUpdateWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateWithoutToNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EdgeUncheckedUpdateManyWithoutToNodeInputSchema: z.ZodType<Prisma.EdgeUncheckedUpdateManyWithoutToNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUpdateWithoutNodeInputSchema: z.ZodType<Prisma.LocationUpdateWithoutNodeInput> = z.object({
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.lazy(() => BuildingUpdateOneRequiredWithoutLocationNestedInputSchema).optional(),
  Department: z.lazy(() => DepartmentUpdateOneWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutNodeInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  departmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateManyWithoutNodeInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  departmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DepartmentServicesCreateManyDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesCreateManyDepartmentInput> = z.object({
  serviceID: z.number().int()
}).strict();

export const LocationCreateManyDepartmentInputSchema: z.ZodType<Prisma.LocationCreateManyDepartmentInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  buildingId: z.number().int(),
  nodeID: z.number().int().optional().nullable()
}).strict();

export const DepartmentServicesUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateWithoutDepartmentInput> = z.object({
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputSchema).optional()
}).strict();

export const DepartmentServicesUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateWithoutDepartmentInput> = z.object({
  serviceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentServicesUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  serviceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUpdateWithoutDepartmentInput> = z.object({
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.lazy(() => BuildingUpdateOneRequiredWithoutLocationNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateOneWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nodeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nodeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DepartmentServicesCreateManyServiceInputSchema: z.ZodType<Prisma.DepartmentServicesCreateManyServiceInput> = z.object({
  departmentID: z.number().int()
}).strict();

export const DepartmentServicesUpdateWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUpdateWithoutServiceInput> = z.object({
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputSchema).optional()
}).strict();

export const DepartmentServicesUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateWithoutServiceInput> = z.object({
  departmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentServicesUncheckedUpdateManyWithoutServiceInputSchema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyWithoutServiceInput> = z.object({
  departmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateManyBuildingInputSchema: z.ZodType<Prisma.LocationCreateManyBuildingInput> = z.object({
  id: z.number().int().optional(),
  floor: z.number().int(),
  suite: z.string().optional().nullable(),
  departmentId: z.number().int().optional().nullable(),
  nodeID: z.number().int().optional().nullable()
}).strict();

export const LocationUpdateWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUpdateWithoutBuildingInput> = z.object({
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Department: z.lazy(() => DepartmentUpdateOneWithoutLocationNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateOneWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutBuildingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nodeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateManyWithoutBuildingInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutBuildingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suite: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nodeID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const EmployeeFindFirstArgsSchema: z.ZodType<Prisma.EmployeeFindFirstArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmployeeScalarFieldEnumSchema,EmployeeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmployeeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmployeeFindFirstOrThrowArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmployeeScalarFieldEnumSchema,EmployeeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmployeeFindManyArgsSchema: z.ZodType<Prisma.EmployeeFindManyArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmployeeScalarFieldEnumSchema,EmployeeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmployeeAggregateArgsSchema: z.ZodType<Prisma.EmployeeAggregateArgs> = z.object({
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmployeeGroupByArgsSchema: z.ZodType<Prisma.EmployeeGroupByArgs> = z.object({
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithAggregationInputSchema.array(),EmployeeOrderByWithAggregationInputSchema ]).optional(),
  by: EmployeeScalarFieldEnumSchema.array(),
  having: EmployeeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmployeeFindUniqueArgsSchema: z.ZodType<Prisma.EmployeeFindUniqueArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const EmployeeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmployeeFindUniqueOrThrowArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const ServiceRequestFindFirstArgsSchema: z.ZodType<Prisma.ServiceRequestFindFirstArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereInputSchema.optional(),
  orderBy: z.union([ ServiceRequestOrderByWithRelationInputSchema.array(),ServiceRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceRequestScalarFieldEnumSchema,ServiceRequestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceRequestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceRequestFindFirstOrThrowArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereInputSchema.optional(),
  orderBy: z.union([ ServiceRequestOrderByWithRelationInputSchema.array(),ServiceRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceRequestScalarFieldEnumSchema,ServiceRequestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceRequestFindManyArgsSchema: z.ZodType<Prisma.ServiceRequestFindManyArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereInputSchema.optional(),
  orderBy: z.union([ ServiceRequestOrderByWithRelationInputSchema.array(),ServiceRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceRequestScalarFieldEnumSchema,ServiceRequestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceRequestAggregateArgsSchema: z.ZodType<Prisma.ServiceRequestAggregateArgs> = z.object({
  where: ServiceRequestWhereInputSchema.optional(),
  orderBy: z.union([ ServiceRequestOrderByWithRelationInputSchema.array(),ServiceRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceRequestGroupByArgsSchema: z.ZodType<Prisma.ServiceRequestGroupByArgs> = z.object({
  where: ServiceRequestWhereInputSchema.optional(),
  orderBy: z.union([ ServiceRequestOrderByWithAggregationInputSchema.array(),ServiceRequestOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceRequestScalarFieldEnumSchema.array(),
  having: ServiceRequestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceRequestFindUniqueArgsSchema: z.ZodType<Prisma.ServiceRequestFindUniqueArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereUniqueInputSchema,
}).strict() ;

export const ServiceRequestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceRequestFindUniqueOrThrowArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereUniqueInputSchema,
}).strict() ;

export const AudioVisualFindFirstArgsSchema: z.ZodType<Prisma.AudioVisualFindFirstArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereInputSchema.optional(),
  orderBy: z.union([ AudioVisualOrderByWithRelationInputSchema.array(),AudioVisualOrderByWithRelationInputSchema ]).optional(),
  cursor: AudioVisualWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AudioVisualScalarFieldEnumSchema,AudioVisualScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AudioVisualFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AudioVisualFindFirstOrThrowArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereInputSchema.optional(),
  orderBy: z.union([ AudioVisualOrderByWithRelationInputSchema.array(),AudioVisualOrderByWithRelationInputSchema ]).optional(),
  cursor: AudioVisualWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AudioVisualScalarFieldEnumSchema,AudioVisualScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AudioVisualFindManyArgsSchema: z.ZodType<Prisma.AudioVisualFindManyArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereInputSchema.optional(),
  orderBy: z.union([ AudioVisualOrderByWithRelationInputSchema.array(),AudioVisualOrderByWithRelationInputSchema ]).optional(),
  cursor: AudioVisualWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AudioVisualScalarFieldEnumSchema,AudioVisualScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AudioVisualAggregateArgsSchema: z.ZodType<Prisma.AudioVisualAggregateArgs> = z.object({
  where: AudioVisualWhereInputSchema.optional(),
  orderBy: z.union([ AudioVisualOrderByWithRelationInputSchema.array(),AudioVisualOrderByWithRelationInputSchema ]).optional(),
  cursor: AudioVisualWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AudioVisualGroupByArgsSchema: z.ZodType<Prisma.AudioVisualGroupByArgs> = z.object({
  where: AudioVisualWhereInputSchema.optional(),
  orderBy: z.union([ AudioVisualOrderByWithAggregationInputSchema.array(),AudioVisualOrderByWithAggregationInputSchema ]).optional(),
  by: AudioVisualScalarFieldEnumSchema.array(),
  having: AudioVisualScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AudioVisualFindUniqueArgsSchema: z.ZodType<Prisma.AudioVisualFindUniqueArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereUniqueInputSchema,
}).strict() ;

export const AudioVisualFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AudioVisualFindUniqueOrThrowArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereUniqueInputSchema,
}).strict() ;

export const ExternalTransportationFindFirstArgsSchema: z.ZodType<Prisma.ExternalTransportationFindFirstArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereInputSchema.optional(),
  orderBy: z.union([ ExternalTransportationOrderByWithRelationInputSchema.array(),ExternalTransportationOrderByWithRelationInputSchema ]).optional(),
  cursor: ExternalTransportationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExternalTransportationScalarFieldEnumSchema,ExternalTransportationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExternalTransportationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExternalTransportationFindFirstOrThrowArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereInputSchema.optional(),
  orderBy: z.union([ ExternalTransportationOrderByWithRelationInputSchema.array(),ExternalTransportationOrderByWithRelationInputSchema ]).optional(),
  cursor: ExternalTransportationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExternalTransportationScalarFieldEnumSchema,ExternalTransportationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExternalTransportationFindManyArgsSchema: z.ZodType<Prisma.ExternalTransportationFindManyArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereInputSchema.optional(),
  orderBy: z.union([ ExternalTransportationOrderByWithRelationInputSchema.array(),ExternalTransportationOrderByWithRelationInputSchema ]).optional(),
  cursor: ExternalTransportationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExternalTransportationScalarFieldEnumSchema,ExternalTransportationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExternalTransportationAggregateArgsSchema: z.ZodType<Prisma.ExternalTransportationAggregateArgs> = z.object({
  where: ExternalTransportationWhereInputSchema.optional(),
  orderBy: z.union([ ExternalTransportationOrderByWithRelationInputSchema.array(),ExternalTransportationOrderByWithRelationInputSchema ]).optional(),
  cursor: ExternalTransportationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExternalTransportationGroupByArgsSchema: z.ZodType<Prisma.ExternalTransportationGroupByArgs> = z.object({
  where: ExternalTransportationWhereInputSchema.optional(),
  orderBy: z.union([ ExternalTransportationOrderByWithAggregationInputSchema.array(),ExternalTransportationOrderByWithAggregationInputSchema ]).optional(),
  by: ExternalTransportationScalarFieldEnumSchema.array(),
  having: ExternalTransportationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExternalTransportationFindUniqueArgsSchema: z.ZodType<Prisma.ExternalTransportationFindUniqueArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereUniqueInputSchema,
}).strict() ;

export const ExternalTransportationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExternalTransportationFindUniqueOrThrowArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereUniqueInputSchema,
}).strict() ;

export const EquipmentDeliveryFindFirstArgsSchema: z.ZodType<Prisma.EquipmentDeliveryFindFirstArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereInputSchema.optional(),
  orderBy: z.union([ EquipmentDeliveryOrderByWithRelationInputSchema.array(),EquipmentDeliveryOrderByWithRelationInputSchema ]).optional(),
  cursor: EquipmentDeliveryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EquipmentDeliveryScalarFieldEnumSchema,EquipmentDeliveryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EquipmentDeliveryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EquipmentDeliveryFindFirstOrThrowArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereInputSchema.optional(),
  orderBy: z.union([ EquipmentDeliveryOrderByWithRelationInputSchema.array(),EquipmentDeliveryOrderByWithRelationInputSchema ]).optional(),
  cursor: EquipmentDeliveryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EquipmentDeliveryScalarFieldEnumSchema,EquipmentDeliveryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EquipmentDeliveryFindManyArgsSchema: z.ZodType<Prisma.EquipmentDeliveryFindManyArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereInputSchema.optional(),
  orderBy: z.union([ EquipmentDeliveryOrderByWithRelationInputSchema.array(),EquipmentDeliveryOrderByWithRelationInputSchema ]).optional(),
  cursor: EquipmentDeliveryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EquipmentDeliveryScalarFieldEnumSchema,EquipmentDeliveryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EquipmentDeliveryAggregateArgsSchema: z.ZodType<Prisma.EquipmentDeliveryAggregateArgs> = z.object({
  where: EquipmentDeliveryWhereInputSchema.optional(),
  orderBy: z.union([ EquipmentDeliveryOrderByWithRelationInputSchema.array(),EquipmentDeliveryOrderByWithRelationInputSchema ]).optional(),
  cursor: EquipmentDeliveryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EquipmentDeliveryGroupByArgsSchema: z.ZodType<Prisma.EquipmentDeliveryGroupByArgs> = z.object({
  where: EquipmentDeliveryWhereInputSchema.optional(),
  orderBy: z.union([ EquipmentDeliveryOrderByWithAggregationInputSchema.array(),EquipmentDeliveryOrderByWithAggregationInputSchema ]).optional(),
  by: EquipmentDeliveryScalarFieldEnumSchema.array(),
  having: EquipmentDeliveryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EquipmentDeliveryFindUniqueArgsSchema: z.ZodType<Prisma.EquipmentDeliveryFindUniqueArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereUniqueInputSchema,
}).strict() ;

export const EquipmentDeliveryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EquipmentDeliveryFindUniqueOrThrowArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereUniqueInputSchema,
}).strict() ;

export const LanguageFindFirstArgsSchema: z.ZodType<Prisma.LanguageFindFirstArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LanguageScalarFieldEnumSchema,LanguageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LanguageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LanguageFindFirstOrThrowArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LanguageScalarFieldEnumSchema,LanguageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LanguageFindManyArgsSchema: z.ZodType<Prisma.LanguageFindManyArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LanguageScalarFieldEnumSchema,LanguageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LanguageAggregateArgsSchema: z.ZodType<Prisma.LanguageAggregateArgs> = z.object({
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithRelationInputSchema.array(),LanguageOrderByWithRelationInputSchema ]).optional(),
  cursor: LanguageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LanguageGroupByArgsSchema: z.ZodType<Prisma.LanguageGroupByArgs> = z.object({
  where: LanguageWhereInputSchema.optional(),
  orderBy: z.union([ LanguageOrderByWithAggregationInputSchema.array(),LanguageOrderByWithAggregationInputSchema ]).optional(),
  by: LanguageScalarFieldEnumSchema.array(),
  having: LanguageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LanguageFindUniqueArgsSchema: z.ZodType<Prisma.LanguageFindUniqueArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const LanguageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LanguageFindUniqueOrThrowArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const SecurityFindFirstArgsSchema: z.ZodType<Prisma.SecurityFindFirstArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereInputSchema.optional(),
  orderBy: z.union([ SecurityOrderByWithRelationInputSchema.array(),SecurityOrderByWithRelationInputSchema ]).optional(),
  cursor: SecurityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SecurityScalarFieldEnumSchema,SecurityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SecurityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SecurityFindFirstOrThrowArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereInputSchema.optional(),
  orderBy: z.union([ SecurityOrderByWithRelationInputSchema.array(),SecurityOrderByWithRelationInputSchema ]).optional(),
  cursor: SecurityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SecurityScalarFieldEnumSchema,SecurityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SecurityFindManyArgsSchema: z.ZodType<Prisma.SecurityFindManyArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereInputSchema.optional(),
  orderBy: z.union([ SecurityOrderByWithRelationInputSchema.array(),SecurityOrderByWithRelationInputSchema ]).optional(),
  cursor: SecurityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SecurityScalarFieldEnumSchema,SecurityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SecurityAggregateArgsSchema: z.ZodType<Prisma.SecurityAggregateArgs> = z.object({
  where: SecurityWhereInputSchema.optional(),
  orderBy: z.union([ SecurityOrderByWithRelationInputSchema.array(),SecurityOrderByWithRelationInputSchema ]).optional(),
  cursor: SecurityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SecurityGroupByArgsSchema: z.ZodType<Prisma.SecurityGroupByArgs> = z.object({
  where: SecurityWhereInputSchema.optional(),
  orderBy: z.union([ SecurityOrderByWithAggregationInputSchema.array(),SecurityOrderByWithAggregationInputSchema ]).optional(),
  by: SecurityScalarFieldEnumSchema.array(),
  having: SecurityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SecurityFindUniqueArgsSchema: z.ZodType<Prisma.SecurityFindUniqueArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereUniqueInputSchema,
}).strict() ;

export const SecurityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SecurityFindUniqueOrThrowArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereUniqueInputSchema,
}).strict() ;

export const EdgeFindFirstArgsSchema: z.ZodType<Prisma.EdgeFindFirstArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereInputSchema.optional(),
  orderBy: z.union([ EdgeOrderByWithRelationInputSchema.array(),EdgeOrderByWithRelationInputSchema ]).optional(),
  cursor: EdgeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EdgeScalarFieldEnumSchema,EdgeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EdgeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EdgeFindFirstOrThrowArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereInputSchema.optional(),
  orderBy: z.union([ EdgeOrderByWithRelationInputSchema.array(),EdgeOrderByWithRelationInputSchema ]).optional(),
  cursor: EdgeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EdgeScalarFieldEnumSchema,EdgeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EdgeFindManyArgsSchema: z.ZodType<Prisma.EdgeFindManyArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereInputSchema.optional(),
  orderBy: z.union([ EdgeOrderByWithRelationInputSchema.array(),EdgeOrderByWithRelationInputSchema ]).optional(),
  cursor: EdgeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EdgeScalarFieldEnumSchema,EdgeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EdgeAggregateArgsSchema: z.ZodType<Prisma.EdgeAggregateArgs> = z.object({
  where: EdgeWhereInputSchema.optional(),
  orderBy: z.union([ EdgeOrderByWithRelationInputSchema.array(),EdgeOrderByWithRelationInputSchema ]).optional(),
  cursor: EdgeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EdgeGroupByArgsSchema: z.ZodType<Prisma.EdgeGroupByArgs> = z.object({
  where: EdgeWhereInputSchema.optional(),
  orderBy: z.union([ EdgeOrderByWithAggregationInputSchema.array(),EdgeOrderByWithAggregationInputSchema ]).optional(),
  by: EdgeScalarFieldEnumSchema.array(),
  having: EdgeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EdgeFindUniqueArgsSchema: z.ZodType<Prisma.EdgeFindUniqueArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereUniqueInputSchema,
}).strict() ;

export const EdgeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EdgeFindUniqueOrThrowArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereUniqueInputSchema,
}).strict() ;

export const NodeFindFirstArgsSchema: z.ZodType<Prisma.NodeFindFirstArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NodeScalarFieldEnumSchema,NodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NodeFindFirstOrThrowArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NodeScalarFieldEnumSchema,NodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NodeFindManyArgsSchema: z.ZodType<Prisma.NodeFindManyArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NodeScalarFieldEnumSchema,NodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NodeAggregateArgsSchema: z.ZodType<Prisma.NodeAggregateArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NodeGroupByArgsSchema: z.ZodType<Prisma.NodeGroupByArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithAggregationInputSchema.array(),NodeOrderByWithAggregationInputSchema ]).optional(),
  by: NodeScalarFieldEnumSchema.array(),
  having: NodeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NodeFindUniqueArgsSchema: z.ZodType<Prisma.NodeFindUniqueArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const NodeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NodeFindUniqueOrThrowArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const DepartmentFindFirstArgsSchema: z.ZodType<Prisma.DepartmentFindFirstArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DepartmentFindFirstOrThrowArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentFindManyArgsSchema: z.ZodType<Prisma.DepartmentFindManyArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentAggregateArgsSchema: z.ZodType<Prisma.DepartmentAggregateArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentGroupByArgsSchema: z.ZodType<Prisma.DepartmentGroupByArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithAggregationInputSchema.array(),DepartmentOrderByWithAggregationInputSchema ]).optional(),
  by: DepartmentScalarFieldEnumSchema.array(),
  having: DepartmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentFindUniqueArgsSchema: z.ZodType<Prisma.DepartmentFindUniqueArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DepartmentFindUniqueOrThrowArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const DepartmentServicesFindFirstArgsSchema: z.ZodType<Prisma.DepartmentServicesFindFirstArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentServicesOrderByWithRelationInputSchema.array(),DepartmentServicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentServicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentServicesScalarFieldEnumSchema,DepartmentServicesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentServicesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DepartmentServicesFindFirstOrThrowArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentServicesOrderByWithRelationInputSchema.array(),DepartmentServicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentServicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentServicesScalarFieldEnumSchema,DepartmentServicesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentServicesFindManyArgsSchema: z.ZodType<Prisma.DepartmentServicesFindManyArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentServicesOrderByWithRelationInputSchema.array(),DepartmentServicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentServicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentServicesScalarFieldEnumSchema,DepartmentServicesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentServicesAggregateArgsSchema: z.ZodType<Prisma.DepartmentServicesAggregateArgs> = z.object({
  where: DepartmentServicesWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentServicesOrderByWithRelationInputSchema.array(),DepartmentServicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentServicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentServicesGroupByArgsSchema: z.ZodType<Prisma.DepartmentServicesGroupByArgs> = z.object({
  where: DepartmentServicesWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentServicesOrderByWithAggregationInputSchema.array(),DepartmentServicesOrderByWithAggregationInputSchema ]).optional(),
  by: DepartmentServicesScalarFieldEnumSchema.array(),
  having: DepartmentServicesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentServicesFindUniqueArgsSchema: z.ZodType<Prisma.DepartmentServicesFindUniqueArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereUniqueInputSchema,
}).strict() ;

export const DepartmentServicesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DepartmentServicesFindUniqueOrThrowArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereUniqueInputSchema,
}).strict() ;

export const BuildingFindFirstArgsSchema: z.ZodType<Prisma.BuildingFindFirstArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildingScalarFieldEnumSchema,BuildingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BuildingFindFirstOrThrowArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildingScalarFieldEnumSchema,BuildingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildingFindManyArgsSchema: z.ZodType<Prisma.BuildingFindManyArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildingScalarFieldEnumSchema,BuildingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildingAggregateArgsSchema: z.ZodType<Prisma.BuildingAggregateArgs> = z.object({
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BuildingGroupByArgsSchema: z.ZodType<Prisma.BuildingGroupByArgs> = z.object({
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithAggregationInputSchema.array(),BuildingOrderByWithAggregationInputSchema ]).optional(),
  by: BuildingScalarFieldEnumSchema.array(),
  having: BuildingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BuildingFindUniqueArgsSchema: z.ZodType<Prisma.BuildingFindUniqueArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const BuildingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BuildingFindUniqueOrThrowArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const SearchAlgorithmFindFirstArgsSchema: z.ZodType<Prisma.SearchAlgorithmFindFirstArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereInputSchema.optional(),
  orderBy: z.union([ SearchAlgorithmOrderByWithRelationInputSchema.array(),SearchAlgorithmOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchAlgorithmWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SearchAlgorithmScalarFieldEnumSchema,SearchAlgorithmScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SearchAlgorithmFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SearchAlgorithmFindFirstOrThrowArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereInputSchema.optional(),
  orderBy: z.union([ SearchAlgorithmOrderByWithRelationInputSchema.array(),SearchAlgorithmOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchAlgorithmWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SearchAlgorithmScalarFieldEnumSchema,SearchAlgorithmScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SearchAlgorithmFindManyArgsSchema: z.ZodType<Prisma.SearchAlgorithmFindManyArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereInputSchema.optional(),
  orderBy: z.union([ SearchAlgorithmOrderByWithRelationInputSchema.array(),SearchAlgorithmOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchAlgorithmWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SearchAlgorithmScalarFieldEnumSchema,SearchAlgorithmScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SearchAlgorithmAggregateArgsSchema: z.ZodType<Prisma.SearchAlgorithmAggregateArgs> = z.object({
  where: SearchAlgorithmWhereInputSchema.optional(),
  orderBy: z.union([ SearchAlgorithmOrderByWithRelationInputSchema.array(),SearchAlgorithmOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchAlgorithmWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SearchAlgorithmGroupByArgsSchema: z.ZodType<Prisma.SearchAlgorithmGroupByArgs> = z.object({
  where: SearchAlgorithmWhereInputSchema.optional(),
  orderBy: z.union([ SearchAlgorithmOrderByWithAggregationInputSchema.array(),SearchAlgorithmOrderByWithAggregationInputSchema ]).optional(),
  by: SearchAlgorithmScalarFieldEnumSchema.array(),
  having: SearchAlgorithmScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SearchAlgorithmFindUniqueArgsSchema: z.ZodType<Prisma.SearchAlgorithmFindUniqueArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereUniqueInputSchema,
}).strict() ;

export const SearchAlgorithmFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SearchAlgorithmFindUniqueOrThrowArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereUniqueInputSchema,
}).strict() ;

export const EmployeeCreateArgsSchema: z.ZodType<Prisma.EmployeeCreateArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  data: z.union([ EmployeeCreateInputSchema,EmployeeUncheckedCreateInputSchema ]),
}).strict() ;

export const EmployeeUpsertArgsSchema: z.ZodType<Prisma.EmployeeUpsertArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
  create: z.union([ EmployeeCreateInputSchema,EmployeeUncheckedCreateInputSchema ]),
  update: z.union([ EmployeeUpdateInputSchema,EmployeeUncheckedUpdateInputSchema ]),
}).strict() ;

export const EmployeeCreateManyArgsSchema: z.ZodType<Prisma.EmployeeCreateManyArgs> = z.object({
  data: z.union([ EmployeeCreateManyInputSchema,EmployeeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmployeeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmployeeCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmployeeCreateManyInputSchema,EmployeeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmployeeDeleteArgsSchema: z.ZodType<Prisma.EmployeeDeleteArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const EmployeeUpdateArgsSchema: z.ZodType<Prisma.EmployeeUpdateArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  data: z.union([ EmployeeUpdateInputSchema,EmployeeUncheckedUpdateInputSchema ]),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const EmployeeUpdateManyArgsSchema: z.ZodType<Prisma.EmployeeUpdateManyArgs> = z.object({
  data: z.union([ EmployeeUpdateManyMutationInputSchema,EmployeeUncheckedUpdateManyInputSchema ]),
  where: EmployeeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmployeeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmployeeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmployeeUpdateManyMutationInputSchema,EmployeeUncheckedUpdateManyInputSchema ]),
  where: EmployeeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmployeeDeleteManyArgsSchema: z.ZodType<Prisma.EmployeeDeleteManyArgs> = z.object({
  where: EmployeeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ServiceRequestCreateArgsSchema: z.ZodType<Prisma.ServiceRequestCreateArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  data: z.union([ ServiceRequestCreateInputSchema,ServiceRequestUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceRequestUpsertArgsSchema: z.ZodType<Prisma.ServiceRequestUpsertArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereUniqueInputSchema,
  create: z.union([ ServiceRequestCreateInputSchema,ServiceRequestUncheckedCreateInputSchema ]),
  update: z.union([ ServiceRequestUpdateInputSchema,ServiceRequestUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceRequestCreateManyArgsSchema: z.ZodType<Prisma.ServiceRequestCreateManyArgs> = z.object({
  data: z.union([ ServiceRequestCreateManyInputSchema,ServiceRequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceRequestCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceRequestCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceRequestCreateManyInputSchema,ServiceRequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceRequestDeleteArgsSchema: z.ZodType<Prisma.ServiceRequestDeleteArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  where: ServiceRequestWhereUniqueInputSchema,
}).strict() ;

export const ServiceRequestUpdateArgsSchema: z.ZodType<Prisma.ServiceRequestUpdateArgs> = z.object({
  select: ServiceRequestSelectSchema.optional(),
  include: ServiceRequestIncludeSchema.optional(),
  data: z.union([ ServiceRequestUpdateInputSchema,ServiceRequestUncheckedUpdateInputSchema ]),
  where: ServiceRequestWhereUniqueInputSchema,
}).strict() ;

export const ServiceRequestUpdateManyArgsSchema: z.ZodType<Prisma.ServiceRequestUpdateManyArgs> = z.object({
  data: z.union([ ServiceRequestUpdateManyMutationInputSchema,ServiceRequestUncheckedUpdateManyInputSchema ]),
  where: ServiceRequestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ServiceRequestUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceRequestUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceRequestUpdateManyMutationInputSchema,ServiceRequestUncheckedUpdateManyInputSchema ]),
  where: ServiceRequestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ServiceRequestDeleteManyArgsSchema: z.ZodType<Prisma.ServiceRequestDeleteManyArgs> = z.object({
  where: ServiceRequestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AudioVisualCreateArgsSchema: z.ZodType<Prisma.AudioVisualCreateArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  data: z.union([ AudioVisualCreateInputSchema,AudioVisualUncheckedCreateInputSchema ]),
}).strict() ;

export const AudioVisualUpsertArgsSchema: z.ZodType<Prisma.AudioVisualUpsertArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereUniqueInputSchema,
  create: z.union([ AudioVisualCreateInputSchema,AudioVisualUncheckedCreateInputSchema ]),
  update: z.union([ AudioVisualUpdateInputSchema,AudioVisualUncheckedUpdateInputSchema ]),
}).strict() ;

export const AudioVisualCreateManyArgsSchema: z.ZodType<Prisma.AudioVisualCreateManyArgs> = z.object({
  data: z.union([ AudioVisualCreateManyInputSchema,AudioVisualCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AudioVisualCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AudioVisualCreateManyAndReturnArgs> = z.object({
  data: z.union([ AudioVisualCreateManyInputSchema,AudioVisualCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AudioVisualDeleteArgsSchema: z.ZodType<Prisma.AudioVisualDeleteArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  where: AudioVisualWhereUniqueInputSchema,
}).strict() ;

export const AudioVisualUpdateArgsSchema: z.ZodType<Prisma.AudioVisualUpdateArgs> = z.object({
  select: AudioVisualSelectSchema.optional(),
  include: AudioVisualIncludeSchema.optional(),
  data: z.union([ AudioVisualUpdateInputSchema,AudioVisualUncheckedUpdateInputSchema ]),
  where: AudioVisualWhereUniqueInputSchema,
}).strict() ;

export const AudioVisualUpdateManyArgsSchema: z.ZodType<Prisma.AudioVisualUpdateManyArgs> = z.object({
  data: z.union([ AudioVisualUpdateManyMutationInputSchema,AudioVisualUncheckedUpdateManyInputSchema ]),
  where: AudioVisualWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AudioVisualUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AudioVisualUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AudioVisualUpdateManyMutationInputSchema,AudioVisualUncheckedUpdateManyInputSchema ]),
  where: AudioVisualWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AudioVisualDeleteManyArgsSchema: z.ZodType<Prisma.AudioVisualDeleteManyArgs> = z.object({
  where: AudioVisualWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExternalTransportationCreateArgsSchema: z.ZodType<Prisma.ExternalTransportationCreateArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  data: z.union([ ExternalTransportationCreateInputSchema,ExternalTransportationUncheckedCreateInputSchema ]),
}).strict() ;

export const ExternalTransportationUpsertArgsSchema: z.ZodType<Prisma.ExternalTransportationUpsertArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereUniqueInputSchema,
  create: z.union([ ExternalTransportationCreateInputSchema,ExternalTransportationUncheckedCreateInputSchema ]),
  update: z.union([ ExternalTransportationUpdateInputSchema,ExternalTransportationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExternalTransportationCreateManyArgsSchema: z.ZodType<Prisma.ExternalTransportationCreateManyArgs> = z.object({
  data: z.union([ ExternalTransportationCreateManyInputSchema,ExternalTransportationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExternalTransportationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ExternalTransportationCreateManyAndReturnArgs> = z.object({
  data: z.union([ ExternalTransportationCreateManyInputSchema,ExternalTransportationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExternalTransportationDeleteArgsSchema: z.ZodType<Prisma.ExternalTransportationDeleteArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  where: ExternalTransportationWhereUniqueInputSchema,
}).strict() ;

export const ExternalTransportationUpdateArgsSchema: z.ZodType<Prisma.ExternalTransportationUpdateArgs> = z.object({
  select: ExternalTransportationSelectSchema.optional(),
  include: ExternalTransportationIncludeSchema.optional(),
  data: z.union([ ExternalTransportationUpdateInputSchema,ExternalTransportationUncheckedUpdateInputSchema ]),
  where: ExternalTransportationWhereUniqueInputSchema,
}).strict() ;

export const ExternalTransportationUpdateManyArgsSchema: z.ZodType<Prisma.ExternalTransportationUpdateManyArgs> = z.object({
  data: z.union([ ExternalTransportationUpdateManyMutationInputSchema,ExternalTransportationUncheckedUpdateManyInputSchema ]),
  where: ExternalTransportationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExternalTransportationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ExternalTransportationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ExternalTransportationUpdateManyMutationInputSchema,ExternalTransportationUncheckedUpdateManyInputSchema ]),
  where: ExternalTransportationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExternalTransportationDeleteManyArgsSchema: z.ZodType<Prisma.ExternalTransportationDeleteManyArgs> = z.object({
  where: ExternalTransportationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EquipmentDeliveryCreateArgsSchema: z.ZodType<Prisma.EquipmentDeliveryCreateArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  data: z.union([ EquipmentDeliveryCreateInputSchema,EquipmentDeliveryUncheckedCreateInputSchema ]),
}).strict() ;

export const EquipmentDeliveryUpsertArgsSchema: z.ZodType<Prisma.EquipmentDeliveryUpsertArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereUniqueInputSchema,
  create: z.union([ EquipmentDeliveryCreateInputSchema,EquipmentDeliveryUncheckedCreateInputSchema ]),
  update: z.union([ EquipmentDeliveryUpdateInputSchema,EquipmentDeliveryUncheckedUpdateInputSchema ]),
}).strict() ;

export const EquipmentDeliveryCreateManyArgsSchema: z.ZodType<Prisma.EquipmentDeliveryCreateManyArgs> = z.object({
  data: z.union([ EquipmentDeliveryCreateManyInputSchema,EquipmentDeliveryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EquipmentDeliveryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EquipmentDeliveryCreateManyAndReturnArgs> = z.object({
  data: z.union([ EquipmentDeliveryCreateManyInputSchema,EquipmentDeliveryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EquipmentDeliveryDeleteArgsSchema: z.ZodType<Prisma.EquipmentDeliveryDeleteArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  where: EquipmentDeliveryWhereUniqueInputSchema,
}).strict() ;

export const EquipmentDeliveryUpdateArgsSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateArgs> = z.object({
  select: EquipmentDeliverySelectSchema.optional(),
  include: EquipmentDeliveryIncludeSchema.optional(),
  data: z.union([ EquipmentDeliveryUpdateInputSchema,EquipmentDeliveryUncheckedUpdateInputSchema ]),
  where: EquipmentDeliveryWhereUniqueInputSchema,
}).strict() ;

export const EquipmentDeliveryUpdateManyArgsSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateManyArgs> = z.object({
  data: z.union([ EquipmentDeliveryUpdateManyMutationInputSchema,EquipmentDeliveryUncheckedUpdateManyInputSchema ]),
  where: EquipmentDeliveryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EquipmentDeliveryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EquipmentDeliveryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EquipmentDeliveryUpdateManyMutationInputSchema,EquipmentDeliveryUncheckedUpdateManyInputSchema ]),
  where: EquipmentDeliveryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EquipmentDeliveryDeleteManyArgsSchema: z.ZodType<Prisma.EquipmentDeliveryDeleteManyArgs> = z.object({
  where: EquipmentDeliveryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LanguageCreateArgsSchema: z.ZodType<Prisma.LanguageCreateArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  data: z.union([ LanguageCreateInputSchema,LanguageUncheckedCreateInputSchema ]),
}).strict() ;

export const LanguageUpsertArgsSchema: z.ZodType<Prisma.LanguageUpsertArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
  create: z.union([ LanguageCreateInputSchema,LanguageUncheckedCreateInputSchema ]),
  update: z.union([ LanguageUpdateInputSchema,LanguageUncheckedUpdateInputSchema ]),
}).strict() ;

export const LanguageCreateManyArgsSchema: z.ZodType<Prisma.LanguageCreateManyArgs> = z.object({
  data: z.union([ LanguageCreateManyInputSchema,LanguageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LanguageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LanguageCreateManyAndReturnArgs> = z.object({
  data: z.union([ LanguageCreateManyInputSchema,LanguageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LanguageDeleteArgsSchema: z.ZodType<Prisma.LanguageDeleteArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const LanguageUpdateArgsSchema: z.ZodType<Prisma.LanguageUpdateArgs> = z.object({
  select: LanguageSelectSchema.optional(),
  include: LanguageIncludeSchema.optional(),
  data: z.union([ LanguageUpdateInputSchema,LanguageUncheckedUpdateInputSchema ]),
  where: LanguageWhereUniqueInputSchema,
}).strict() ;

export const LanguageUpdateManyArgsSchema: z.ZodType<Prisma.LanguageUpdateManyArgs> = z.object({
  data: z.union([ LanguageUpdateManyMutationInputSchema,LanguageUncheckedUpdateManyInputSchema ]),
  where: LanguageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LanguageUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LanguageUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LanguageUpdateManyMutationInputSchema,LanguageUncheckedUpdateManyInputSchema ]),
  where: LanguageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LanguageDeleteManyArgsSchema: z.ZodType<Prisma.LanguageDeleteManyArgs> = z.object({
  where: LanguageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SecurityCreateArgsSchema: z.ZodType<Prisma.SecurityCreateArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  data: z.union([ SecurityCreateInputSchema,SecurityUncheckedCreateInputSchema ]),
}).strict() ;

export const SecurityUpsertArgsSchema: z.ZodType<Prisma.SecurityUpsertArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereUniqueInputSchema,
  create: z.union([ SecurityCreateInputSchema,SecurityUncheckedCreateInputSchema ]),
  update: z.union([ SecurityUpdateInputSchema,SecurityUncheckedUpdateInputSchema ]),
}).strict() ;

export const SecurityCreateManyArgsSchema: z.ZodType<Prisma.SecurityCreateManyArgs> = z.object({
  data: z.union([ SecurityCreateManyInputSchema,SecurityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SecurityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SecurityCreateManyAndReturnArgs> = z.object({
  data: z.union([ SecurityCreateManyInputSchema,SecurityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SecurityDeleteArgsSchema: z.ZodType<Prisma.SecurityDeleteArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  where: SecurityWhereUniqueInputSchema,
}).strict() ;

export const SecurityUpdateArgsSchema: z.ZodType<Prisma.SecurityUpdateArgs> = z.object({
  select: SecuritySelectSchema.optional(),
  include: SecurityIncludeSchema.optional(),
  data: z.union([ SecurityUpdateInputSchema,SecurityUncheckedUpdateInputSchema ]),
  where: SecurityWhereUniqueInputSchema,
}).strict() ;

export const SecurityUpdateManyArgsSchema: z.ZodType<Prisma.SecurityUpdateManyArgs> = z.object({
  data: z.union([ SecurityUpdateManyMutationInputSchema,SecurityUncheckedUpdateManyInputSchema ]),
  where: SecurityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SecurityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SecurityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SecurityUpdateManyMutationInputSchema,SecurityUncheckedUpdateManyInputSchema ]),
  where: SecurityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SecurityDeleteManyArgsSchema: z.ZodType<Prisma.SecurityDeleteManyArgs> = z.object({
  where: SecurityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EdgeCreateArgsSchema: z.ZodType<Prisma.EdgeCreateArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  data: z.union([ EdgeCreateInputSchema,EdgeUncheckedCreateInputSchema ]),
}).strict() ;

export const EdgeUpsertArgsSchema: z.ZodType<Prisma.EdgeUpsertArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereUniqueInputSchema,
  create: z.union([ EdgeCreateInputSchema,EdgeUncheckedCreateInputSchema ]),
  update: z.union([ EdgeUpdateInputSchema,EdgeUncheckedUpdateInputSchema ]),
}).strict() ;

export const EdgeCreateManyArgsSchema: z.ZodType<Prisma.EdgeCreateManyArgs> = z.object({
  data: z.union([ EdgeCreateManyInputSchema,EdgeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EdgeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EdgeCreateManyAndReturnArgs> = z.object({
  data: z.union([ EdgeCreateManyInputSchema,EdgeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EdgeDeleteArgsSchema: z.ZodType<Prisma.EdgeDeleteArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  where: EdgeWhereUniqueInputSchema,
}).strict() ;

export const EdgeUpdateArgsSchema: z.ZodType<Prisma.EdgeUpdateArgs> = z.object({
  select: EdgeSelectSchema.optional(),
  include: EdgeIncludeSchema.optional(),
  data: z.union([ EdgeUpdateInputSchema,EdgeUncheckedUpdateInputSchema ]),
  where: EdgeWhereUniqueInputSchema,
}).strict() ;

export const EdgeUpdateManyArgsSchema: z.ZodType<Prisma.EdgeUpdateManyArgs> = z.object({
  data: z.union([ EdgeUpdateManyMutationInputSchema,EdgeUncheckedUpdateManyInputSchema ]),
  where: EdgeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EdgeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EdgeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EdgeUpdateManyMutationInputSchema,EdgeUncheckedUpdateManyInputSchema ]),
  where: EdgeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EdgeDeleteManyArgsSchema: z.ZodType<Prisma.EdgeDeleteManyArgs> = z.object({
  where: EdgeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NodeCreateArgsSchema: z.ZodType<Prisma.NodeCreateArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  data: z.union([ NodeCreateInputSchema,NodeUncheckedCreateInputSchema ]),
}).strict() ;

export const NodeUpsertArgsSchema: z.ZodType<Prisma.NodeUpsertArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
  create: z.union([ NodeCreateInputSchema,NodeUncheckedCreateInputSchema ]),
  update: z.union([ NodeUpdateInputSchema,NodeUncheckedUpdateInputSchema ]),
}).strict() ;

export const NodeCreateManyArgsSchema: z.ZodType<Prisma.NodeCreateManyArgs> = z.object({
  data: z.union([ NodeCreateManyInputSchema,NodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NodeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NodeCreateManyAndReturnArgs> = z.object({
  data: z.union([ NodeCreateManyInputSchema,NodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NodeDeleteArgsSchema: z.ZodType<Prisma.NodeDeleteArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const NodeUpdateArgsSchema: z.ZodType<Prisma.NodeUpdateArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  data: z.union([ NodeUpdateInputSchema,NodeUncheckedUpdateInputSchema ]),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const NodeUpdateManyArgsSchema: z.ZodType<Prisma.NodeUpdateManyArgs> = z.object({
  data: z.union([ NodeUpdateManyMutationInputSchema,NodeUncheckedUpdateManyInputSchema ]),
  where: NodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NodeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NodeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NodeUpdateManyMutationInputSchema,NodeUncheckedUpdateManyInputSchema ]),
  where: NodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NodeDeleteManyArgsSchema: z.ZodType<Prisma.NodeDeleteManyArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict() ;

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict() ;

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LocationCreateManyAndReturnArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LocationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LocationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentCreateArgsSchema: z.ZodType<Prisma.DepartmentCreateArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  data: z.union([ DepartmentCreateInputSchema,DepartmentUncheckedCreateInputSchema ]),
}).strict() ;

export const DepartmentUpsertArgsSchema: z.ZodType<Prisma.DepartmentUpsertArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
  create: z.union([ DepartmentCreateInputSchema,DepartmentUncheckedCreateInputSchema ]),
  update: z.union([ DepartmentUpdateInputSchema,DepartmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const DepartmentCreateManyArgsSchema: z.ZodType<Prisma.DepartmentCreateManyArgs> = z.object({
  data: z.union([ DepartmentCreateManyInputSchema,DepartmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DepartmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DepartmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ DepartmentCreateManyInputSchema,DepartmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DepartmentDeleteArgsSchema: z.ZodType<Prisma.DepartmentDeleteArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentUpdateArgsSchema: z.ZodType<Prisma.DepartmentUpdateArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  data: z.union([ DepartmentUpdateInputSchema,DepartmentUncheckedUpdateInputSchema ]),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentUpdateManyArgsSchema: z.ZodType<Prisma.DepartmentUpdateManyArgs> = z.object({
  data: z.union([ DepartmentUpdateManyMutationInputSchema,DepartmentUncheckedUpdateManyInputSchema ]),
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DepartmentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DepartmentUpdateManyMutationInputSchema,DepartmentUncheckedUpdateManyInputSchema ]),
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentDeleteManyArgsSchema: z.ZodType<Prisma.DepartmentDeleteManyArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ServiceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentServicesCreateArgsSchema: z.ZodType<Prisma.DepartmentServicesCreateArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  data: z.union([ DepartmentServicesCreateInputSchema,DepartmentServicesUncheckedCreateInputSchema ]),
}).strict() ;

export const DepartmentServicesUpsertArgsSchema: z.ZodType<Prisma.DepartmentServicesUpsertArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereUniqueInputSchema,
  create: z.union([ DepartmentServicesCreateInputSchema,DepartmentServicesUncheckedCreateInputSchema ]),
  update: z.union([ DepartmentServicesUpdateInputSchema,DepartmentServicesUncheckedUpdateInputSchema ]),
}).strict() ;

export const DepartmentServicesCreateManyArgsSchema: z.ZodType<Prisma.DepartmentServicesCreateManyArgs> = z.object({
  data: z.union([ DepartmentServicesCreateManyInputSchema,DepartmentServicesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DepartmentServicesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DepartmentServicesCreateManyAndReturnArgs> = z.object({
  data: z.union([ DepartmentServicesCreateManyInputSchema,DepartmentServicesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DepartmentServicesDeleteArgsSchema: z.ZodType<Prisma.DepartmentServicesDeleteArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  where: DepartmentServicesWhereUniqueInputSchema,
}).strict() ;

export const DepartmentServicesUpdateArgsSchema: z.ZodType<Prisma.DepartmentServicesUpdateArgs> = z.object({
  select: DepartmentServicesSelectSchema.optional(),
  include: DepartmentServicesIncludeSchema.optional(),
  data: z.union([ DepartmentServicesUpdateInputSchema,DepartmentServicesUncheckedUpdateInputSchema ]),
  where: DepartmentServicesWhereUniqueInputSchema,
}).strict() ;

export const DepartmentServicesUpdateManyArgsSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyArgs> = z.object({
  data: z.union([ DepartmentServicesUpdateManyMutationInputSchema,DepartmentServicesUncheckedUpdateManyInputSchema ]),
  where: DepartmentServicesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentServicesUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DepartmentServicesUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DepartmentServicesUpdateManyMutationInputSchema,DepartmentServicesUncheckedUpdateManyInputSchema ]),
  where: DepartmentServicesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentServicesDeleteManyArgsSchema: z.ZodType<Prisma.DepartmentServicesDeleteManyArgs> = z.object({
  where: DepartmentServicesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BuildingCreateArgsSchema: z.ZodType<Prisma.BuildingCreateArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  data: z.union([ BuildingCreateInputSchema,BuildingUncheckedCreateInputSchema ]),
}).strict() ;

export const BuildingUpsertArgsSchema: z.ZodType<Prisma.BuildingUpsertArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
  create: z.union([ BuildingCreateInputSchema,BuildingUncheckedCreateInputSchema ]),
  update: z.union([ BuildingUpdateInputSchema,BuildingUncheckedUpdateInputSchema ]),
}).strict() ;

export const BuildingCreateManyArgsSchema: z.ZodType<Prisma.BuildingCreateManyArgs> = z.object({
  data: z.union([ BuildingCreateManyInputSchema,BuildingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BuildingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BuildingCreateManyAndReturnArgs> = z.object({
  data: z.union([ BuildingCreateManyInputSchema,BuildingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BuildingDeleteArgsSchema: z.ZodType<Prisma.BuildingDeleteArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const BuildingUpdateArgsSchema: z.ZodType<Prisma.BuildingUpdateArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  data: z.union([ BuildingUpdateInputSchema,BuildingUncheckedUpdateInputSchema ]),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const BuildingUpdateManyArgsSchema: z.ZodType<Prisma.BuildingUpdateManyArgs> = z.object({
  data: z.union([ BuildingUpdateManyMutationInputSchema,BuildingUncheckedUpdateManyInputSchema ]),
  where: BuildingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BuildingUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BuildingUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BuildingUpdateManyMutationInputSchema,BuildingUncheckedUpdateManyInputSchema ]),
  where: BuildingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BuildingDeleteManyArgsSchema: z.ZodType<Prisma.BuildingDeleteManyArgs> = z.object({
  where: BuildingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SearchAlgorithmCreateArgsSchema: z.ZodType<Prisma.SearchAlgorithmCreateArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  data: z.union([ SearchAlgorithmCreateInputSchema,SearchAlgorithmUncheckedCreateInputSchema ]),
}).strict() ;

export const SearchAlgorithmUpsertArgsSchema: z.ZodType<Prisma.SearchAlgorithmUpsertArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereUniqueInputSchema,
  create: z.union([ SearchAlgorithmCreateInputSchema,SearchAlgorithmUncheckedCreateInputSchema ]),
  update: z.union([ SearchAlgorithmUpdateInputSchema,SearchAlgorithmUncheckedUpdateInputSchema ]),
}).strict() ;

export const SearchAlgorithmCreateManyArgsSchema: z.ZodType<Prisma.SearchAlgorithmCreateManyArgs> = z.object({
  data: z.union([ SearchAlgorithmCreateManyInputSchema,SearchAlgorithmCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SearchAlgorithmCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SearchAlgorithmCreateManyAndReturnArgs> = z.object({
  data: z.union([ SearchAlgorithmCreateManyInputSchema,SearchAlgorithmCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SearchAlgorithmDeleteArgsSchema: z.ZodType<Prisma.SearchAlgorithmDeleteArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  where: SearchAlgorithmWhereUniqueInputSchema,
}).strict() ;

export const SearchAlgorithmUpdateArgsSchema: z.ZodType<Prisma.SearchAlgorithmUpdateArgs> = z.object({
  select: SearchAlgorithmSelectSchema.optional(),
  data: z.union([ SearchAlgorithmUpdateInputSchema,SearchAlgorithmUncheckedUpdateInputSchema ]),
  where: SearchAlgorithmWhereUniqueInputSchema,
}).strict() ;

export const SearchAlgorithmUpdateManyArgsSchema: z.ZodType<Prisma.SearchAlgorithmUpdateManyArgs> = z.object({
  data: z.union([ SearchAlgorithmUpdateManyMutationInputSchema,SearchAlgorithmUncheckedUpdateManyInputSchema ]),
  where: SearchAlgorithmWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SearchAlgorithmUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SearchAlgorithmUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SearchAlgorithmUpdateManyMutationInputSchema,SearchAlgorithmUncheckedUpdateManyInputSchema ]),
  where: SearchAlgorithmWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SearchAlgorithmDeleteManyArgsSchema: z.ZodType<Prisma.SearchAlgorithmDeleteManyArgs> = z.object({
  where: SearchAlgorithmWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;