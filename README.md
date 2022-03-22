## Unofficial ID Cloudhost API Client

#### Getting started
- Install package:

```bash
yarn add idcloudhost-node-client
```

- Usage
```typescript
import IdcClient from 'idcloudhost-node-client'

const apikey = 'Your API KEY'
const idcClient = IdcClient(apikey)

idcClient.getUserInfo()
    .then(console.log)
    .catch(console.error)
```

#### API Docs
- [https://api.idcloudhost.com](https://api.idcloudhost.com)
