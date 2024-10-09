import {Button, Col, Collapse, Row} from 'antd';
import {FC, useState} from 'react';
import classNames from "classnames";
import {RightIcon, TelegramIcon, UserIcon, WhatsappIcon} from "../../../components/Icons";
import {FullManagerContactModel} from "../../../interfaces/contacts/models";
import {formatToInputPhone} from "../../../tools/utils";
import {Colors} from "../../../interfaces/common";

const Contact: FC<FullManagerContactModel> = (
    {
        emails,
        fullName,
        filial,
        juridicals,
        isShowTelegram,
        isShowWhatsapp,
        phone,
        photo,
        telegramLink,
        whatsappLink,
    }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='contact'>
            <div className='contact__manager'>
                <div className="contact__img">
                    {photo ? (
                        <img
                            alt={photo?.name ?? ''}
                            src={photo?.url ?? ''}
                        />
                    ) : <UserIcon />}
                </div>
                <div className="contact__manager-links">
                    <p className='text-2-medium-sm contact__name'>{fullName}</p>
                    {emails?.map((email, index) => (
                        <Button key={index} type='link' className='contact__link'
                                href={`mailto:${email}`}>{email}</Button>
                    ))}
                    {phone && (
                        <p className="color-ui-6 text-2-sm">{formatToInputPhone(phone)}</p>
                    )}
                    {((isShowWhatsapp || isShowTelegram) && (whatsappLink || telegramLink)) && (
                        <Row gutter={[12, 12]}>
                            {isShowWhatsapp && whatsappLink && (
                                <Col span={24}>
                                    <a href={whatsappLink ?? ''} target="_blank" rel="noreferrer" className="text-2-sm contact__social">
                                        Написать в WhatsApp
                                        <WhatsappIcon style={{color: Colors.WHATS_APP}} />
                                    </a>
                                </Col>
                            )}
                            {isShowTelegram && telegramLink && (
                                <Col span={24}>
                                    <a href={telegramLink ?? ''} target="_blank" rel="noreferrer" className="text-2-sm contact__social">
                                        Написать в Telegram
                                        <TelegramIcon style={{color: Colors.TELEGRAM}} />
                                    </a>
                                </Col>
                            )}
                        </Row>
                    )}
                </div>
            </div>
            <div className='contact__info'>
                <div className='contact__item contact__info-header'>
                    <div className='contact__tag text-3-sm'>
                        <span>
                            {filial}
                        </span>
                    </div>
                    {juridicals && juridicals.length > 0 && (
                        <div className="contact__tag text-3-sm">
                            Юрлица
                            <span className="menu-item-tag menu-item-tag_green">{juridicals.length}</span>
                        </div>
                    )}
                </div>
                <div className='contact__item text-3-sm'>
                    <div className='contact__value contact__juridicals'>
                        {juridicals?.length > 3 ? (
                            <>
                                {juridicals?.slice(0, 3).map(({name}, index) => (
                                    <p className="text-3-sm" key={index}>{name}</p>
                                ))}
                                <Collapse
                                    className={classNames("news-inner contact__collapse", {collapsed: !collapsed})}
                                    expandIcon={() => <RightIcon />}
                                    expandIconPosition="right"
                                    onChange={() => setCollapsed(!collapsed)}
                                >
                                    <Collapse.Panel key={filial} header={collapsed ? "Свернуть" : "Показать все"}>
                                        {juridicals?.slice(3).map(({name}, index) => (
                                            <p className="text-3-sm" key={index}>{name}</p>
                                        ))}
                                    </Collapse.Panel>
                                </Collapse>
                            </>
                        ) : (
                            <>
                                {juridicals?.map(({name}, index) => (
                                    <p key={index}>{name}</p>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;