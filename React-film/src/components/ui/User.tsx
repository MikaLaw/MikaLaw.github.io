import { useGetUserQuery, useLogoutActionMutation } from '@/api/authApi';
import { Picture } from '@/components/ui/Picture';
import { AppRoute } from '@/consts';
import { Link } from 'react-router';

export const User = () => {
    const [logout] = useLogoutActionMutation();
    const { data: user } = useGetUserQuery();

    if (user) {
        return (
            <ul className="user-block">
                <li className="user-block__item">
                    <Link to={AppRoute.MyList} className="user-block__avatar-link">
                        <div className="user-block__avatar">
                            <Picture bg={user?.avatarUrl} name={user?.name} />
                        </div>
                    </Link>
                </li>
                <li className="user-block__item">
                    <button
                        onClick={() => logout()}
                        className="user-block__link"
                    >
                        Выйти
                    </button>
                </li>
            </ul>
        );
    }

    return (
        <div className="user-block">
            <Link to={AppRoute.Login} className="user-block__link">Войти</Link>
        </div>
    );
};