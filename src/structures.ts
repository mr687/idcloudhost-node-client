export interface Endpoint {
    path: string,
    method?: 'get' | 'post' | 'patch' | 'delete',
    version?: string,
}

export interface ErrorResponse {
    errors: {
        [key: string]: string
    }
}

export interface SuccessResponse {
    success: boolean
}

export interface ProfileData {
    id: number
    user_id: number
    first_name: string
    last_name: string
    email: string
    personal_id_number: string
    phone_number: string
    avatar: string
    created_at: string
    updated_at?: string
}

export interface UserInfo {
    id: number
    name: string
    profile?: string
    profile_data: ProfileData,
    last_activity: string,
    cookie_id: string,
    state: UserState,
}

export interface UserState {}

export interface Token {
    id: number
    user_id: number
    kong_id: string
    billing_account_id: number
    consumer_id: string
    token: string
    description: string
    restricted: boolean
    created_at: string
    updated_at?: string
}

export interface Location {
    slug: string
    display_name: string
    country_code: string
    description: string
    order_nr: number
    is_preferred: boolean
    is_default: boolean
}

export interface VirtualMachine {
    backup: boolean
    billing_account: number
    created_at: string
    description: string
    hostname: string
    id: number
    mac: string
    memory: number
    name: string
    os_name: string
    os_version: string
    private_ipv4: string
    status: string
    storage: Storage[]
    tags: any
    updated_at: string
    user_id: number
    username: string
    uuid: string
    vcpu: number
}

export interface Storage {
    created_at: string
    id: number
    name: string
    pool: string
    primary: boolean
    replica?: Replica[]
    shared: boolean
    size: number
    type: string
    updated_at: any
    user_id: number
    uuid: string
}

export interface CreateReplica {
    created_at: string,
    id: number,
    name: string,
    pool: string,
    primary: boolean,
    replica: Replica[],
    shared: boolean,
    size: number,
    type: string,
    updated_at?: string,
    user_id: number,
    uuid: string,
}

export interface Replica {
    created_at: string
    id: number
    master_id: number
    master_uuid: string
    pool: string
    size: number
    type: string
    updated_at: any
    uuid: string
}

export interface Disk {
    created_at: string
    id: number
    name: string
    pool: string
    primary: boolean
    replica: Replica[]
    shared: boolean
    size: number
    type: string
    updated_at: any
    user_id: number
    uuid: string
}

export interface S3Info {
    url: string
}

export interface S3Bucket {
    name: string
    size_bytes: number
    billing_account_id: number
    num_objects: number
    created_at: string
    modified_at: string
}

export interface S3User {
    caps: any[]
    displayName: string
    email: string
    maxBuckets: number
    s3Credentials: S3Credential[]
    subusers: any[]
    suspended: number
    swiftCredentials: any[]
    userId: string
}
  
export interface S3Credential {
    accessKey: string
    secretKey: string
    userId: string
}

export interface NetworkData {
    vlan_id: number
    subnet: string
    name: string
    created_at: string
    updated_at: string
    uuid: string
    type: string
    is_default: boolean
    vm_uuids: string[]
    resources_count: number
}

export interface FloatingIP {
    id: number
    address: string
    user_id: number
    billing_account_id: number
    type: string
    network_id: any
    name: string
    enabled: boolean
    created_at: string
    updated_at: string
    assigned_to?: string
}

export interface VMParameters {
    constraint: string
    description: string
    mandatory: boolean
    max?: number
    min?: number
    parameter: string
    type: string
    expression?: string
    values?: string[]
    limited_by?: string
    limits?: Limit[]
}

export interface Limit {
    min?: number
    os_name: string
    mandatory?: boolean
    values?: string[]
}

export interface Image {
    os_name: string
    display_name: string
    ui_position: number
    is_default: boolean
    is_app_catalog: boolean
    icon: string
    versions: ImageVersion[]
}

export interface ImageVersion {
    os_version: string
    display_name: string
    published: boolean
}

export interface Billing {
    backup: boolean
    billing_account: number
    created_at: string
    description: string
    hostname: string
    hypervisor_id: any
    id: number
    mac: string
    memory: number
    name: string
    os_name: string
    os_version: string
    private_ipv4: string
    public_ipv4?: string
    status: string
    storage: Storage[]
    tags: any
    updated_at?: string
    user_id: number
    username: string
    uuid: string
    vcpu: number
}

export interface BillingAccount {
    additional_data: string
    address_line1: string
    allow_debt: boolean
    can_pay: boolean
    city: string
    company_name: string
    company_reg_code: string
    company_vat_number: string
    country: string
    county: string
    created: number
    credit_amount: number
    discount_percentage: number
    email: string
    id: number
    is_active: boolean
    is_default: boolean
    is_deleted: boolean
    is_recurring_payment_enabled: boolean
    paying_by_invoice: boolean
    post_index: string
    primary_card: PrimaryCard
    recurring_payment_amount: number
    recurring_payment_threshold: number
    referral_share_code: string
    reseller: string
    restriction_level: string
    running_totals: RunningTotals
    send_invoice_email: boolean
    site: string
    suspend_reason: string
    title: string
    unpaid_amount: number
    user_id: number
    vat_percentage: number
}

export interface PrimaryCard {
    id: string
    expire_month: number
    expire_year: number
    last4: string
    card_type: string
    card_holder: string
    type: string
    processor_data: ProcessorData
    is_verified: boolean
}

export interface ProcessorData {
    id: string
    object: string
    billing_details: BillingDetails
    card: Card
    created: number
    customer: string
    livemode: boolean
    metadata: Metadata
    type: string
}

export interface BillingDetails {
    address: Address
    email: any
    name: string
    phone: any
}

export interface Address {
    city: any
    country: any
    line1: any
    line2: any
    postal_code: any
    state: any
}

export interface Card {
    brand: string
    checks: Checks
    country: string
    exp_month: number
    exp_year: number
    fingerprint: string
    funding: string
    generated_from: any
    last4: string
    three_d_secure_usage: ThreeDSecureUsage
    wallet: any
}

export interface Checks {
    address_line1_check: any
    address_postal_code_check: any
    cvc_check: string
}

export interface ThreeDSecureUsage {
    supported: boolean
}

export interface Metadata {}

export interface RunningTotals {
    credit_amount: number
    credit_available: number
    discount_amount: number
    ongoing: number
    subtotal: number
    total: number
    vat_tax: number
}

export interface RecurringPayment {
    payment_report: PaymentReport
    account: BillingAccount
}

export interface PaymentReport {
    triggered: boolean
    errors: any[]
}

export interface UnpaidAmount {
    message: number
}

export interface InvoicePaying {
    is_verified: boolean
    billing_account_id: number
    identifier: string
    additional_data: string
    billing_account_processor_identifier_id: number
    is_primary: boolean
    valid_thru: number
    id: number
    created: number
    is_deleted: boolean
}

export interface CreditCardDetails {
    additional_data: string
    billing_account_id: number
    billing_account_processor_identifier_id: number
    created: number
    id: number
    identifier: string
    is_primary: boolean
    is_verified: boolean
    valid_thru: number
}

export interface Credit {
    amount: number
    billing_account_id: number
    created: number
    description: string
    id: number
}

export interface InvoiceDetails {
    account_snapshot: string
    billing_account_id: number
    created: number
    discount_percentage: number
    due_date: number
    id: number
    padded_id: string
    period_end: number
    period_start: number
    records_list: RecordsList[]
    status: number
    totals: Totals
    transaction_list: TransactionList[]
    vat_percentage: number
}

export interface RecordsList {
    amount: number
    created: number
    descr: string
    id: number
    invoice_id: number
    item_price: number
    name: string
    qty: number
    qty_unit: string
}

export interface Totals {
    subtotal: number
    discount_amount: number
    credit: number
    vat_tax: number
    total: number
}

export interface TransactionList {
    additional_data: string
    amount: number
    created: number
    id: number
    identifier: string
    payment_object_id: number
}

export interface PayAmount {
    amount_left: number
    amount_used: number
    error_log: string
    message: string
    paid_invoices: number[]
    success: boolean
}

export interface PricingPolicy {
    policy: Policy[]
}

export interface Policy {
    numCpus?: number
    policyId: number
    price: number
    resourceType: string
    serviceNameUserFriendly: string
    megsRam?: number
    serviceNameInUptime?: string
}

export interface ResourceUsage {
    billing_account_id: number
    configurations: Configuration[]
    cost: number
    description: string
    hours: number
    owner_uuid: string
    price: number
    price_unit: string
    uptime_types: string[]
    user_id: number
}

export interface Configuration {
    cpus: number
    disk_size_GB?: number
    os_name?: string
    ram_MB: number
    vm_name: string
}

export interface ServicePackage {
    billing_account_id: number
    created_at: string
    display_name: string
    is_deleted: boolean
    is_multi_node: boolean
    prices: Price[]
    properties: Properties
    resources: Resource[]
    service: string
    status: string
    updated_at: string
    user_id: number
    uuid: string
    version: string
}

export interface Price {
    priceMultiplier: number
    resourceType: string
    serviceNameInUptime?: string
}

export interface Properties {
    service_ip: string
    location: string
    sql_user: string
    port: number
}

export interface Resource {
    resource_allocation: ResourceAllocation
    resource_id: string
    resource_location: string
    resource_type: string
}

export interface ResourceAllocation {
    address?: string
    memory?: number
    vcpu?: number
    status?: string
    storage?: Storage[]
}

export interface Storage {
    primary: boolean
    size: number
    uuid: string
    replica?: Replica[]
}