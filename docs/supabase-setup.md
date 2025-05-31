# Supabase 数据库设置指南

## 📋 数据库表结构

### 创建 feedback 表

在 Supabase SQL 编辑器中执行以下 SQL 语句：

```sql
-- 创建 feedback 表
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  suggestion TEXT NOT NULL CHECK (char_length(suggestion) >= 10 AND char_length(suggestion) <= 500),
  email VARCHAR(255),
  timestamp TIMESTAMPTZ NOT NULL,
  user_agent TEXT,
  page_url TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'implemented', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON feedback 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 创建索引以提高查询性能
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_email ON feedback(email) WHERE email IS NOT NULL;

-- 添加行级安全策略 (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户插入反馈
CREATE POLICY "Allow anonymous insert" ON feedback
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- 只允许认证用户查看反馈（管理员功能）
CREATE POLICY "Allow authenticated read" ON feedback
  FOR SELECT 
  TO authenticated 
  USING (true);

-- 只允许认证用户更新反馈状态（管理员功能）
CREATE POLICY "Allow authenticated update" ON feedback
  FOR UPDATE 
  TO authenticated 
  USING (true);
```

## 🔑 API 密钥配置

### 1. 获取 Supabase 项目信息

在 Supabase 项目设置中找到：
- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Key**: 用于客户端访问的公开密钥

### 2. 更新 API 文件

在 `src/pages/api/feedback.ts` 中更新以下配置：

```typescript
// 替换为您的实际 Supabase 配置
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## 📊 数据库字段说明

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| `id` | BIGSERIAL | 主键，自动递增 | PRIMARY KEY |
| `suggestion` | TEXT | 用户建议内容 | 10-500字符，NOT NULL |
| `email` | VARCHAR(255) | 用户邮箱（可选） | 可为空 |
| `timestamp` | TIMESTAMPTZ | 提交时间戳 | NOT NULL |
| `user_agent` | TEXT | 用户浏览器信息 | 可为空 |
| `page_url` | TEXT | 提交页面URL | 可为空 |
| `status` | VARCHAR(20) | 处理状态 | 默认'new' |
| `created_at` | TIMESTAMPTZ | 创建时间 | 自动生成 |
| `updated_at` | TIMESTAMPTZ | 更新时间 | 自动更新 |

## 🔒 安全配置

### 行级安全策略 (RLS)

1. **匿名插入策略**: 允许未登录用户提交反馈
2. **认证读取策略**: 只有登录用户（管理员）可以查看反馈
3. **认证更新策略**: 只有登录用户（管理员）可以更新反馈状态

### 数据验证

- 建议内容：10-500字符限制
- 邮箱格式：标准邮箱格式验证
- 状态值：限制为预定义状态

## 📈 管理反馈数据

### 查看所有反馈

```sql
SELECT 
  id,
  suggestion,
  email,
  status,
  created_at
FROM feedback 
ORDER BY created_at DESC;
```

### 按状态筛选

```sql
SELECT * FROM feedback 
WHERE status = 'new' 
ORDER BY created_at DESC;
```

### 更新反馈状态

```sql
UPDATE feedback 
SET status = 'reviewed' 
WHERE id = 1;
```

## 🚀 部署注意事项

1. **环境变量**: 考虑使用环境变量存储敏感信息
2. **CORS 配置**: 确保 Supabase 项目允许您的域名访问
3. **速率限制**: 考虑添加提交频率限制
4. **数据备份**: 定期备份重要的反馈数据

## 📧 邮件通知（可选）

可以设置 Supabase 数据库触发器，在收到新反馈时发送邮件通知：

```sql
-- 创建邮件通知函数（需要配置 Supabase Edge Functions）
CREATE OR REPLACE FUNCTION notify_new_feedback()
RETURNS TRIGGER AS $$
BEGIN
  -- 这里可以调用 Edge Function 发送邮件
  -- 或者使用 Supabase 的 webhook 功能
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_feedback_notification
  AFTER INSERT ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_feedback();
```

## 🔧 故障排除

### 常见问题

1. **403 错误**: 检查 RLS 策略配置
2. **401 错误**: 验证 API 密钥是否正确
3. **CORS 错误**: 检查 Supabase 项目的 CORS 设置
4. **插入失败**: 检查数据验证约束

### 调试技巧

1. 在 Supabase 控制台查看实时日志
2. 使用浏览器开发者工具检查网络请求
3. 检查 API 响应中的错误信息
