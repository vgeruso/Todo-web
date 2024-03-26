const baseUrl = 'http://localhost:3000/api/v1';

export const getTasks = async () => {
  return await fetch(`${baseUrl}/task`, {
    mode: 'cors',
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const addTask = async (data: any) => {
  return await fetch(`${baseUrl}/task`, {
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTaskById = async (id: string) => {
  return await fetch(`${baseUrl}/task/${id}`, {
    mode: 'cors',
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const editTask = async (data: any) => {
  return await fetch(`${baseUrl}/task/update`, {
    mode: 'cors',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteTask = async (taskId: any) => {
  return await fetch(`${baseUrl}/task/${taskId}`, {
    mode: 'cors',
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
