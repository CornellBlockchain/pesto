import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { ListItemProps } from '../../types';

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  avatar,
  badge,
  showChevron = false,
}) => {
  const containerStyle = [
    styles.container,
    onPress && styles.pressable,
  ];

  const content = (
    <View style={styles.content}>
      {/* Left side */}
      <View style={styles.left}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : leftIcon ? (
          <View style={styles.iconContainer}>
            <Ionicons
              name={leftIcon as any}
              size={24}
              color={theme.colors.text.tertiary}
            />
          </View>
        ) : null}
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Right side */}
      <View style={styles.right}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        
        {rightIcon && (
          <Ionicons
            name={rightIcon as any}
            size={20}
            color={theme.colors.text.tertiary}
            style={styles.rightIcon}
          />
        )}
        
        {showChevron && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.text.tertiary}
            style={styles.chevron}
          />
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
    ...theme.spacing.component.listItem,
  },
  pressable: {
    // Add any pressable-specific styles here
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing.dimensions.avatar.md,
    height: theme.spacing.dimensions.avatar.md,
    borderRadius: theme.spacing.dimensions.avatar.md / 2,
    marginRight: 12,
  },
  iconContainer: {
    width: theme.spacing.dimensions.avatar.md,
    height: theme.spacing.dimensions.avatar.md,
    borderRadius: theme.spacing.dimensions.avatar.md / 2,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.textStyles.transactionName,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.textStyles.transactionDescription,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: theme.colors.status.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginRight: 8,
  },
  badgeText: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.white,
    fontWeight: '600',
  },
  rightIcon: {
    marginLeft: 8,
  },
  chevron: {
    marginLeft: 8,
  },
});

