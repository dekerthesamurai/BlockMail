# from data. import create_code, get_all_codes_by_user_id

# def save_code_handler(session, code, user_id):
#     return create_code(session, code, user_id)

# def list_code_handler(session, user_id):
#     return get_all_codes_by_user_id(session, user_id)


from data.mails import create_mail, get_all_mails_by_user_id, delete_mail_by_id, delete_all_mails, delete_all_mails_by_user_id, delete_mail, get_mail_by_id


def send_mail_handler(session, mail, from_user_id):
    return create_mail(session, mail, from_user_id)

def list_mail_handler(session, user_id):
    return get_all_mails_by_user_id(session, user_id)



# def delete_mail_handler(session, mail_id):
#     return delete_mail_by_id(session, mail_id)