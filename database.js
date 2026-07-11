const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "<redacted>",
    host: "pg-waview-kindness.h.aivencloud.com",
    port: 22875,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIERDCCAqygAwIBAgIURCavLvV7kKzT2CO2qKa9Mdk4RrswDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYzE0NGVhNDQtYmMxNC00OTY0LTgxMDgtYTcwOTBjMTYy
YTM3IFByb2plY3QgQ0EwHhcNMjYwNzExMjIzNjQ5WhcNMzYwNzA4MjIzNjQ5WjA6
MTgwNgYDVQQDDC9jMTQ0ZWE0NC1iYzE0LTQ5NjQtODEwOC1hNzA5MGMxNjJhMzcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAL8N058c
EisESkkHk8+qxSn/3P6F5BXa+26S8ooPDcLw2HQoJX85AizsOSOM1qi8n+j10coZ
7jAV4T75ZP9yyQy216N/5vSlr8sE8CmMZIjyTFD3B5iUxinMnARLnYVbkhGRU/az
kk/+zSxLwJgpkkG0isPArHu1RzexgDcCADD+/XUZz9rwCu2Nl12Oft7fbBOhkjSN
oj/P6Hh1XdjGH5UM/+c+qK+DBizIbmAL3cf++KFHhqyb+jD7HoCvd9zY6jyQ6aIb
8KnmhjCvZblcTWabKGKSqvIf3zSA6pOcAzem2WfRAVxplcp8owqG+NoyuGwRlgWk
K+5cgEuiV77MES7rB5wBYeI6bxnyp5lxZP3wvnrH3/3Wsf+kLMgd3yC6/FbtUpfO
k1JEYXSlQUnYdG7lmzD/17+R6Az1bnQBSJJNLIvXaGSJ1/mXzl5Oc9nikADOtSRE
n5g7WgC4dRzDz1icaATiyKDfpHvvfmM7u9NgeBigd7BV1lCBsmdlwPqJUwIDAQAB
o0IwQDAdBgNVHQ4EFgQUJoDNXo/0zRZ8Q0IfbBw7cJtUDiwwEgYDVR0TAQH/BAgw
BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJ7ud/qPGFOf
WOOwURIrWW2gPTzq9KYZZDhUNtBdPWUopfROnalMpjNbRWdDs7Whvj2TugGZFagb
Rh4fG50Pl5bxTYHkmARuAy3chqmP82c2jv6OhvRJnsdYWd97vrfFIE60VwdRY4Ws
/k7Bw7djTdtuX0YOfnUu3dgm6trayEsJPfTcBlKoJ7IStlgdD9/8wv2p+fHv1niG
RPbjC4H/IYpMafNvk5iDrendQyQDmFupFI8ww5uXETRd1Wp8DjC50HkaJn0EFL6A
hIS4hRz5219dbMLr/guYZ3n2kC63gIlqtURPj5pwlh95RXqQrRbs53Cadl+cNCAp
Nf0PhPoxa+0Tyw3tOCr8ImhiPPmB97zhi3gzWYLOnXB+azfPIpv6AkAtfleIzdYs
DPebEmuP+uijHQRv71uCjPy75H96ieAGbRdkzrf6PvJji+brtLq2LhNnGHWLOrHu
bp+3ZSxJ628WSSRQoY5sTpbhxRebLmPSXQ+UPJK5l11efxxWcfQ3DQ==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});