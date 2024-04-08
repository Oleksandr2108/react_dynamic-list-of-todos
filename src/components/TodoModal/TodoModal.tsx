import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import cn from 'classnames';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setIsLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo?.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  if (!selectedTodo || !user) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn(
                  selectedTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger',
                )}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
