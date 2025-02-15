const express = require('express');
const soap = require('soap');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3019;

app.use(cors());

const wsdl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions name="RoleService"
    targetNamespace="http://localhost:3019/update-role"
    xmlns:tns="http://localhost:3019/update-role"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:http="http://schemas.xmlsoap.org/wsdl/http/"
    xmlns="http://schemas.xmlsoap.org/wsdl/">
    <message name="UpdateRoleRequest">
        <part name="role" type="xsd:string"/>
        <part name="id" type="xsd:int"/> <!-- Usamos 'id' en lugar de 'userId' -->
    </message>
    <message name="UpdateRoleResponse">
        <part name="status" type="xsd:string"/>
    </message>
    <portType name="RoleServicePortType">
        <operation name="updateRole">
            <input message="tns:UpdateRoleRequest"/>
            <output message="tns:UpdateRoleResponse"/>
        </operation>
    </portType>
    <binding name="RoleServiceBinding" type="tns:RoleServicePortType">
        <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="updateRole">
            <soap:operation soapAction="updateRole"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>
    <service name="RoleService">
        <port name="RoleServicePort" binding="tns:RoleServiceBinding">
            <soap:address location="http://localhost:3019/update-role"/>
        </port>
    </service>
</definitions>`;

const service = {
    RoleService: {
        RoleServicePort: {
            updateRole: (args, callback) => {
                const { role, id } = args;

                if (!id || !role) {
                    callback({ status: 'Error: id y role son requeridos' });
                    return;
                }

                const query = 'UPDATE roles SET nombre = ? WHERE id = ?';
                db.query(query, [role, id], (err, result) => {
                    if (err) {
                        callback({ status: `Error al actualizar el rol: ${err.message}` });
                    } else if (result.affectedRows === 0) {
                        callback({ status: 'Error: no se encontró un rol con ese id' });
                    } else {
                        callback({ status: 'Rol actualizado correctamente' });
                    }
                });
            }
        }
    }
};

app.listen(port, () => {
    soap.listen(app, '/update-role', service, wsdl);
    console.log(`Microservicio escuchando en http://localhost:${port}`);
});
