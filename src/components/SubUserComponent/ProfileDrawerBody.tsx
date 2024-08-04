import { Avatar, Col, Divider, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { UserOutlined } from '@ant-design/icons';

const ProfileDrawerBody: React.FC<{ user: CommonUserRes }> = ({ user }) => {
    return (
        <>
            <Title level={4} style={{ color: "#377DFF", textAlign: "center" }}>
                Thông tin user
            </Title>
            <Row gutter={[20, 20]}>
                <Col span={12}>
                    <Divider orientation="left" plain>
                        ID
                    </Divider>
                    <Paragraph copyable={{ text: String(user.id) }}>{user.id}</Paragraph>
                </Col>
                <Col span={12}>
                    <Divider orientation="left" plain>
                        Email
                    </Divider>
                    <Paragraph copyable={{ text: user.email }}>{user.email}</Paragraph>
                </Col>
                <Col span={12}>
                    <Divider orientation="left" plain>
                        FirstName
                    </Divider>
                    <Paragraph copyable={{ text: user.firstName }}>
                        {user.firstName}
                    </Paragraph>
                </Col>
                <Col span={12}>
                    <Divider dashed orientation="left" plain>
                        LastName
                    </Divider>
                    <Paragraph copyable={{ text: user.lastName }}>
                        {user.lastName}
                    </Paragraph>
                </Col>
                <Col span={24} >
                    <Divider dashed orientation="left" plain>
                        Avatar
                    </Divider>
                    <div style={{padding:"8px",border:"2px solid #000",width:"fit-content",borderRadius:"50%" }}>
                        {user.avatar ? <Avatar size={200} src={user.avatar.url} /> : <Avatar size={200} icon={<UserOutlined />} />
                        }
                    </div>
                </Col>
            </Row>
        </>
    );
};


export default ProfileDrawerBody