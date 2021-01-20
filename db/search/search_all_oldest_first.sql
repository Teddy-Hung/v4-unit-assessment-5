SELECT p.id AS post_id, u.username AS author_username 
FROM helo_users u 
JOIN helo_posts p ON p.author_id = u.id
ORDER BY date_created ASC;