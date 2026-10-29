import type { Comment, Comments } from "../types";
import { getLocalComments } from "../utils";
import { baseApi } from "./baseApi";

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByFilmId: builder.query<Comment[], number>({
            queryFn: async (filmId) => {
                await new Promise((resolve) => setTimeout(resolve, 150));
                const allCommentsGroup = getLocalComments() as Comments[];

                // Ищем нужный фильм в структуре
                const filmGroup = allCommentsGroup.find(f => f.filmId === filmId);
                return { data: filmGroup ? filmGroup.comments : [] };
            },
            providesTags: ['Comments'],
        }),

        // 2. Мутация отправки нового комментария (ревью)
        addComment: builder.mutation<void, { filmId: number; text: string; rating: number; userName: string }>({
            queryFn: async ({ filmId, text, rating, userName }) => {
                await new Promise((resolve) => setTimeout(resolve, 200));
                const allCommentsGroup = getLocalComments() as Comments[];

                // ИСПРАВЛЕНО: Заменен тип с Comment на FilmComment
                const newComment: Comment = {
                    id: 'comment_' + Date.now(),
                    user: userName,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    rating: rating,
                    comment: text
                };

                // Модифицируем массив внутри localStorage
                const updatedGroup = allCommentsGroup.map(group => {
                    if (group.filmId === filmId) {
                        return {
                            ...group,
                            comments: [newComment, ...group.comments]
                        };
                    }
                    return group;
                });

                localStorage.setItem('comments', JSON.stringify(updatedGroup));

                return { data: undefined };
            },
            invalidatesTags: ['Comments'],
        }),
    }),
});

export const { useGetCommentsByFilmIdQuery, useAddCommentMutation } = commentsApi;