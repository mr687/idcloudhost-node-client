import HttpClient from "./httpClient";
import { CreateReplica, Disk, ProfileData, Replica, S3Bucket, S3Credential, S3Info, S3User, SuccessResponse, Token, UserInfo, VirtualMachine } from "./structures";

export default class Api {
    private httpClient: HttpClient

    public constructor(apikey: string) {
        if (!apikey) {
            throw new Error('IdCloudhost apikey is required!')
        }
        this.httpClient = new HttpClient('https://api.idcloudhost.com/v1', apikey)
    }

    public async getUserInfo(): Promise<UserInfo> {
        return this.httpClient.get('/user-resource/user')
    }
    public async modifyProfileInfo(
        data: Partial<{
            first_name: string,
            last_name: string,
            phone_number: string,
            personal_id_number: string,
        }>
    ): Promise<ProfileData> {
        return this.httpClient.patch('/user-resource/user/profile', data)
    }
    
    public async deleteToken(tokenId: number): Promise<any> {
        return this.httpClient.delete(`/user-resource/token`, { token_id: tokenId })
    }
    public async updateToken(
        data: {
            billing_account_id?: number,
            description: string,
            restricted?: boolean,
            token_id: string
        }
    ): Promise<any> {
        if (!data.billing_account_id) data.billing_account_id = 0
        if (!data.restricted) data.restricted = false
        return this.httpClient.patch(`/user-resource/token`, data)
    }
    public async createToken(
        data: {
            billing_account_id?: number,
            description: string,
            restricted?: boolean
        }
    ): Promise<Token> {
        if (!data.billing_account_id) data.billing_account_id = 0
        if (!data.restricted) data.restricted = false
        return this.httpClient.post(`/user-resource/token`, data)
    }
    public async listTokens(): Promise<Token[]> {
        return this.httpClient.get('/user-resource/token/list')
    }
    
    public async listLocations(): Promise<Location[]> {
        return this.httpClient.get('/config/locations')
    }
    
    public async deleteVm(locationSlug: string, uuid: string): Promise<any> {
        return this.httpClient.delete(`/${locationSlug}/user-resource/vm`, { uuid })
    }
    public async getVmInfo(locationSlug: string, uuid: string): Promise<VirtualMachine> {
        return this.httpClient.get(`/${locationSlug}/user-resource/vm`, { uuid })
    }
    public async changeVmPassword(
        locationSlug: string,
        data: {
            uuid: string,
            username: string,
            password: string
        }
    ): Promise<SuccessResponse> {
        return this.httpClient.patch(`/${locationSlug}/user-resource/vm/user`, data)
    }
    public async modifyVm(
        locationSlug: string,
        data: {
            uuid: string,
            name: string,
            ram: number, 
            vcpu: number
        }
    ): Promise<SuccessResponse> {
        return this.httpClient.patch(`/${locationSlug}/user-resource/vm`, data)
    }
    public async createVm(
        locationSlug: string,
        data: {
            backup: boolean,
            billing_account_id: number,
            description: string,
            disks: string,
            name: string,
            os_name: string,
            os_version: string,
            password: string,
            public_key: string,
            ram: number,
            source_replica: string,
            source_uuid: string,
            username: string,
            vcpu: number,
            reverse_public_ip: boolean,
            network_uuid: string,
            cloud_init: { [key: string]: any }
        }
    ): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm`, data)
    }
    public async toggleAutoBackup(locationSlug: string, uuid: string): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/backup`, { uuid })
    }
    public async cloneVm(
        locationSlug: string,
        data: {
            uuid: string,
            name: string,
        }
    ): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/clone`, data)
    }
    public async releasePublicIp(locationSlug: string, uuid: string): Promise<VirtualMachine> {
        return this.httpClient.delete(`/${locationSlug}/user-resource/vm/public`, { uuid })
    }
    public async reversePublicIp(locationSlug: string, uuid: string): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/public`, { uuid })
    }
    public async listVms(locationSlug: string): Promise<VirtualMachine[]> {
        return this.httpClient.get(`/${locationSlug}/user-resource/vm/list`)
    }
    public async rebuildFromReplica(
        locationSlug: string,
        data: { replica_uuid: string, uuid: string }
    ): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/rebuild`, data)
    }
    public async deleteReplica(locationSlug: string, replicaUuid: string): Promise<SuccessResponse> {
        return this.httpClient.delete(`/${locationSlug}/user-resource/vm/replica`, { replica_uuid: replicaUuid })
    }
    public async listReplicas(locationSlug: string, query: {
        r_type: string,
        uuid: string,
    }): Promise<Replica[]> {
        return this.httpClient.get(`/${locationSlug}/user-resource/vm/replica`)
    }
    public async convertReplica(
        locationSlug: string,
        data: {
            replica_uuid: string,
            from_type: string,
            to_type: string,
        }
    ): Promise<any> {
        return this.httpClient.patch(`/${locationSlug}/user-resource/vm/replica`, data)
    }
    public async createReplica(
        locationSlug: string,
        data: {
            r_type: string,
            uuid: string
        }
    ): Promise<CreateReplica> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/replica`, data)
    }
    public async startVm(locationSlug: string, uuid: string): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/start`, { uuid })
    }
    public async stopVm(locationSlug: string, uuid: string): Promise<VirtualMachine> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/stop`, { uuid })
    }
    public async bootVmInRescueMode(locationSlug: string, uuid: string): Promise<any> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/rescue_start`, { uuid })
    }
    public async addDisk(
        locationSlug: string,
        data: {
            uuid: string,
            size_gb: number,
        }
    ): Promise<Disk> {
        return this.httpClient.post(`/${locationSlug}/user-resource/vm/storage`, data)
    }
    public async modifyDisk(
        locationSlug: string,
        data: {
            uuid: string,
            disk_uuid: string,
            size_gb: number,
        }
    ): Promise<Disk> {
        return this.httpClient.patch(`/${locationSlug}/user-resource/vm/storage`, data)
    }
    public async deleteDisk(locationSlug: string, data: { uuid: string, storage_uuid: string }): Promise<SuccessResponse> {
        return this.httpClient.delete(`/${locationSlug}/user-resource/vm/storage`, data)
    }

    public async s3ApiInfo(): Promise<S3Info> {
        return this.httpClient.get('/storage/api/s3')
    }
    public async createBucket(data: {
        name: string,
        billing_account_id: number
    }): Promise<S3Bucket> {
        return this.httpClient.put('/storage/bucket', data)
    }
    public async modifyBucket(data: {
        name: string,
        billing_account_id: number
    }): Promise<S3Bucket> {
        return this.httpClient.patch('/storage/bucket', data)
    }
    public async deleteBucket(name: string): Promise<any> {
        return this.httpClient.delete('/storage/bucket', { name })
    }
    public async getBucket(name: string): Promise<S3Bucket> {
        return this.httpClient.get('/storage/bucket', { name })
    }
    public async listBuckets(billing_account_id?: number): Promise<S3Bucket[]> {
        return this.httpClient.get('/storage/bucket/list', { billing_account_id })
    }
    public async getS3User(): Promise<S3User> {
        return this.httpClient.get('/storage/user')
    }
    public async deleteS3Key(access_key: string): Promise<any> {
        return this.httpClient.delete('storage/user/keys', { access_key })
    }
    public async getS3Keys(): Promise<S3Credential> {
        return this.httpClient.get('storage/user/keys')
    }
    public async generateS3Key(): Promise<S3Bucket> {
        return this.httpClient.post('storage/user/keys')
    }
    
    public async getNetworkData(): Promise<void> {}
    public async listNetworks(): Promise<void> {}
    public async createOrGetDefaultNetwork(): Promise<void> {}
    public async deleteNetwork(): Promise<void> {}
    public async changeNetworkToDefault(): Promise<void> {}
    public async changeNetworkName(): Promise<void> {}
    
    public async crateFloatingIp(): Promise<void> {}
    public async listFloatingIps(): Promise<void> {}
    public async getFloatingIp(): Promise<void> {}
    public async updateFloatingIp(): Promise<void> {}
    public async deleteFloatingIp(): Promise<void> {}
    public async assignFloatingIp(): Promise<void> {}
    public async unAssignFloatingIp(): Promise<void> {}
    
    public async vmParameters(): Promise<void> {}
    public async vmImagesList(): Promise<void> {}
    public async getPlainOsImage(): Promise<void> {}
    public async getAppCatalogImages(): Promise<void> {}
    
    public async listBillingAccountResources(): Promise<void> {}
    public async setResourceBillingConf(): Promise<void> {}
    
    public async deleteBillingAccount(): Promise<void> {}
    public async billingAccountDetails(): Promise<void> {}
    public async updateBillingAccount(): Promise<void> {}
    public async configureRecurringPayment(): Promise<void> {}
    public async listBillingAccounts(): Promise<void> {}
    public async setDefaultBillingAccount(): Promise<void> {}
    public async getUnpaidAmount(): Promise<void> {}
    public async applyForInvoicePaying(): Promise<void> {}
    public async removeCreditCard(): Promise<void> {}
    public async creditCardDetails(): Promise<void> {}
    public async addCreditCard(): Promise<void> {}
    public async listCreditCards(): Promise<void> {}
    public async setCardAsPrimary(): Promise<void> {}
    public async listCredit(): Promise<void> {}
    public async buyCredit(): Promise<void> {}
    public async requestInvoiceForCreditTopUp(): Promise<void> {}
    public async invoiceDetails(): Promise<void> {}
    public async listInvoices(): Promise<void> {}
    public async payAll(): Promise<void> {}
    public async payAmount(): Promise<void> {}
    public async payInvoice(): Promise<void> {}
    
    public async pricingPolicy(): Promise<void> {}
    public async googleTagManagerKey(): Promise<void> {}
    
    public async getResourceUsage(): Promise<void> {}
    
    public async createServicePackage(): Promise<void> {}
    public async listServicePackages(): Promise<void> {}
    public async getServicePackage(): Promise<void> {}
    public async updateServicePackageMetadata(): Promise<void> {}
    public async getServiceSecrets(): Promise<void> {}
    public async deleteServicePackage(): Promise<void> {}
}