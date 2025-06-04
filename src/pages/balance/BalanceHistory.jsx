const BalanceHistory = ({data}) => {
  return (
    <table className="balance-history-table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Сумма</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((tx, index) => (
            <tr key={index}>
              <td>
                {/* {new Date(tx.transaction_created_at).toLocaleString("ru-RU")} */}

                {new Date(tx.transaction_created_at).toLocaleDateString()}
              </td>
              <td>{tx.transaction_amount}</td>
              <td>{tx.transaction_description}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Нет транзакций</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BalanceHistory;
