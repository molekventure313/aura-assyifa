import { createAdminClient } from '@/lib/supabase/admin';

export async function logActivity(supabaseAdminOrOptions, optionsObj) {
  try {
    let supabaseAdmin = supabaseAdminOrOptions;
    let opts = optionsObj;

    // Handle case where options is passed as the first parameter
    if (supabaseAdminOrOptions && typeof supabaseAdminOrOptions === 'object' && !supabaseAdminOrOptions.from) {
      opts = supabaseAdminOrOptions;
      supabaseAdmin = createAdminClient();
    }

    if (!supabaseAdmin || !supabaseAdmin.from) {
      supabaseAdmin = createAdminClient();
    }

    const { 
      userId, 
      user_id,
      actionType, 
      action_type,
      entityType, 
      entity_type,
      entityId, 
      entity_id,
      oldValues = null, 
      old_values = null,
      newValues = null, 
      new_values = null,
      description, 
      ipAddress = null,
      ip_address = null
    } = opts || {};

    const { error } = await supabaseAdmin.from('activity_logs').insert({
      user_id: userId || user_id || null,
      action_type: actionType || action_type || 'system_action',
      entity_type: entityType || entity_type || null,
      entity_id: entityId || entity_id || null,
      old_values: oldValues || old_values,
      new_values: newValues || new_values,
      description: description || null,
      ip_address: ipAddress || ip_address
    });

    if (error) {
      console.error('Failed to log activity:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Exception in logActivity:', error);
    return false;
  }
}
